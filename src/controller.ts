import LoggerInstance from './loaders/logger';
import { COLOR_CODES, EMBED, ERROR_MESSAGES, MESSAGES, randomNumber, REGEX } from './shared/constants';
import ytdl from 'ytdl-core';
import { Message, StreamDispatcher, TextChannel, VoiceConnection } from 'discord.js';
import { Play } from './shared/customTypes';
import { resumeCommandHandler, skipCommandHandler } from './commands';
import { spotifyLinkHandler } from './playlistHandler/spotify';
import { playlistYoutube } from './playlistHandler/youtube';
import { validateRegex } from './shared/validation';
import { searchSong, searchTitle } from './shared/yt-search';
import config from './config';
import { setTimer } from './shared/leaveChannel';

export let connectionMap = new Map();

/**
 * The main controller receives the play request and does one of these: resumes the music, adds a song(or a playlist/album) or sends an appropriate error message.
 * @param {Message} message The incoming message from the user
 * @returns {Promise<void|Message>} Returns either void(when the song is resumed) or a message(when a song is added or an error occurs)
 */

export const playRequest = async (message: Message): Promise<void | Message> => {
  try {
    let arrayKeywords = message.content.trim().split(' ');
    if (arrayKeywords.length < 3) {
      if (connectionMap.get(message.guild.id) as Play) return resumeCommandHandler(message);
      return message.channel.send(
        EMBED().setDescription(ERROR_MESSAGES.NO_SONG_URL_OR_KEYWORD).setColor(COLOR_CODES.WRONG_COMMAND_COLOR_CODE),
      );
    }
    if (!message.guild.me.voice.channel) {
      let connection = await message.member.voice.channel.join();
      await connection.voice.setSelfDeaf(true);
      let music: Play = {
        connection: connection,
        queue: [],
        guildID: message.guild.id,
        currentSong: 0,
        loop: false,
        memberCount: 0,
        textChannel: message.channel as TextChannel,
      };
      connectionMap.set(message.guild.id, music);
    }
    let songUrl = arrayKeywords[2];
    if (validateRegex(songUrl, REGEX.YOUTUBE_REGEX)) {
      if (!(await playlistYoutube(message, songUrl))) {
        let songDetails = await searchTitle(message, songUrl);
        if (songDetails) {
          let finalSongDetails = { ...songDetails, originalTitle: songDetails.title, url: songUrl };
          await queueAdd(message, finalSongDetails);
        }
      } else {
        message.channel.send(EMBED().setDescription(MESSAGES.PLAYLIST_ADDED).setColor(COLOR_CODES.PLAYLIST_ADDED));
      }
    } else if (validateRegex(songUrl, REGEX.SPOTIFY_REGEX)) {
      await spotifyLinkHandler(message, songUrl);
      message.channel.send(EMBED().setDescription(MESSAGES.SPOTIFY_URL_PLAYING).setColor(COLOR_CODES.PLAYLIST_ADDED));
    } else {
      const songName = message.content.trim().substring(message.content.trim().split(' ', 2).join(' ').length + 1);
      let song = await searchSong(message, songName);
      if (song.url !== null && song.title !== null) {
        let finalSongDetails = { ...song, originalTitle: songName };
        await queueAdd(message, finalSongDetails);
      }
    }
  } catch (error) {
    LoggerInstance.error(error.message);
    if (error.code === 404)
      return message.channel.send(EMBED().setDescription(error.message).setColor(COLOR_CODES.WRONG_COMMAND_COLOR_CODE));
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};

/**
 * Establishes a connection of the discord application with the voice channel and then stores and returns that connection.
 * @param {Message} message The incoming message
 * @returns {Promise<VoiceConnection>} Returns a voice connection
 */

const connection = async (message: Message): Promise<VoiceConnection> => {
  if (!message.guild.me.voice.channel) {
    let connection = await message.member.voice.channel.join();
    await connection.voice.setSelfDeaf(true);
    let music: Play = {
      connection: connection,
      queue: [],
      guildID: message.guild.id,
      currentSong: 0,
      loop: false,
      memberCount: 0,
      textChannel: message.channel as TextChannel,
    };
    connectionMap.set(message.guild.id, music);
  }
  return (connectionMap.get(message.guild.id) as Play).connection;
};

/**
 * Accepts the song information and adds it to the queue and plays the song on the top of the queue(If none are being played).
 * @param {Message} message The incoming message
 * @param {{ title: string; url: string; originalTitle: string; artistName: string; timestamp: string }} songData Information about the song to be added to the queue
 */

export const queueAdd = async (
  message: Message,
  songData: { title: string; url: string; originalTitle: string; artistName: string; timestamp: string },
): Promise<void> => {
  let music = connectionMap.get(message.guild.id) as Play;
  music.queue.push(songData);
  if (music.queue.length - (connectionMap.get(message.guild.id) as Play).currentSong === 1)
    await playUrl(message, music.queue[(connectionMap.get(message.guild.id) as Play).currentSong]);
};

/**
 * Uses the established voice-connection to fetch the song from ytdl and then stream it on the voice channel using the discord stream dispatcher.
 * @param {Message} message The incoming message
 * @param {{title: string; url: string; originalTitle: string; artistName: string; timestamp: string;}}song Information about the song
 * @returns {Promise<Message>} Return the message sent to the user.
 */

export const playUrl = async (
  message: Message,
  song: {
    title: string;
    url: string;
    originalTitle: string;
    artistName: string;
    timestamp: string;
  },
): Promise<Message> => {
  try {
    if (!song.title) return message.channel.send('could not find the song');
    let stream = ytdl(song.url, { filter: 'audioonly' });
    let dispatcher: StreamDispatcher = (await connection(message)).play(stream, { volume: 1 });
    (connectionMap.get(message.guild.id) as Play).dispatcher = dispatcher;
    await dispatcherControl(message, dispatcher, song);
  } catch (error) {
    LoggerInstance.error(error.message);
    await skipCommandHandler(message);
    message.channel.send(ERROR_MESSAGES.ERROR_PlAYING_SONG);
  }
};

/**
 * Controls the entire stream(of songs) over the discord voice channel(s). Starts the stream, sends and deleted the messages and once a song finishes moves on to the next one in the queue.
 * @param {Message} message The incoming message
 * @param {StreamDispatcher} dispatcher The discord stream dispatcher
 * @param {{title: string; url: string; originalTitle: string; artistName: string; timestamp: string;}}song Information about the song
 */

const dispatcherControl = async (
  message: Message,
  dispatcher: StreamDispatcher,
  song: {
    title: string;
    url: string;
    originalTitle: string;
    artistName: string;
    timestamp: string;
  },
): Promise<void> => {
  let msg: Message;
  console.log(song);
  dispatcher.on('start', async () => {
    if ((connectionMap.get(message.guild.id) as Play).timer)
      clearTimeout((connectionMap.get(message.guild.id) as Play).timer);
    msg = await message.channel.send(
      EMBED()
        .setDescription(`🎶 **${MESSAGES.SONG_START}** [${song.originalTitle}](${song.url})     [${song.timestamp}]`)
        .setColor(COLOR_CODES.PLAYING),
    );
  });
  dispatcher.on('finish', async () => {
    (
      await message.channel.send(
        EMBED()
          .setColor(COLOR_CODES.SONG_FINISHED_PLAYING)
          .setDescription(`${MESSAGES.FINISHED_PLAYING} [${song.originalTitle}](${song.url})`),
      )
    ).delete({ timeout: 15000 });
    await msg.delete();
    (connectionMap.get(message.guild.id) as Play).currentSong++;
    if (
      (connectionMap.get(message.guild.id) as Play).queue.length -
        (connectionMap.get(message.guild.id) as Play).currentSong >
      0
    ) {
      await playUrl(
        message,
        (connectionMap.get(message.guild.id) as Play).queue[(connectionMap.get(message.guild.id) as Play).currentSong],
      );
    }
    if (
      (connectionMap.get(message.guild.id) as Play).queue.length -
        (connectionMap.get(message.guild.id) as Play).currentSong ===
        0 &&
      (connectionMap.get(message.guild.id) as Play).loop === true
    ) {
      (connectionMap.get(message.guild.id) as Play).currentSong = 0;
      await playUrl(
        message,
        (connectionMap.get(message.guild.id) as Play).queue[(connectionMap.get(message.guild.id) as Play).currentSong],
      );
    }
    await setTimer(message);
  });
};
