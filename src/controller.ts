import LoggerInstance from './loaders/logger';
import { COLOR_CODES, EMBED, ERROR_MESSAGES, MESSAGES, randomNumber, REGEX } from './shared/constants';
import ytdl from 'ytdl-core';
import { Message, StreamDispatcher } from 'discord.js';
import { Play } from './shared/customTypes';
import { resumeCommandHandler, skipCommandHandler } from './commands';
import { spotifyLinkHandler } from './playlistHandler/spotify';
import { playlistYoutube } from './playlistHandler/youtube';
import { validateRegex } from './shared/validation';
import { searchSong, searchTitle } from './shared/yt-search';
import config from './config';

export let connectionMap = new Map();

export const playRequest = async message => {
  try {
    if (!message.guild.me.voice.channel) {
      let connection = await message.member.voice.channel.join();
      await connection.voice.setSelfDeaf(true);
      let music: Play = {
        connection: connection,
        queue: [],
        guildID: message.guild.id,
        currentSong: 0,
        loop: false,
      };
      connectionMap.set(message.guild.id, music);
    }
    let arrayKeywords = message.content.trim().split(' ');
    if (arrayKeywords.length < 3) return resumeCommandHandler(message);
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
      let songName = message.content
        .trim()
        .substring(message.content.trim().indexOf(' ', config.PREFIX.length + 2))
        .trim();
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

const connection = async (message: Message) => {
  if (!message.guild.me.voice.channel) {
    let connection = await message.member.voice.channel.join();
    await connection.voice.setSelfDeaf(true);
    let music: Play = {
      connection: connection,
      queue: [],
      guildID: message.guild.id,
      currentSong: 0,
      loop: false,
    };
    connectionMap.set(message.guild.id, music);
  }
  return connectionMap.get(message.guild.id).connection;
};

export const queueAdd = async (
  message,
  songData: { title: string; url: string; originalTitle: string; artistName: string; timestamp: string },
) => {
  let music = connectionMap.get(message.guild.id);
  music.queue.push(songData);
  if (music.queue.length - connectionMap.get(message.guild.id).currentSong === 1)
    await playUrl(message, music.queue[connectionMap.get(message.guild.id).currentSong]);
};

export const playUrl = async (message, song) => {
  try {
    if (!song.title) return message.channel.send('could not find the song');
    let stream = ytdl(song.url, { filter: 'audioonly' });
    let dispatcher: StreamDispatcher = (await connection(message)).play(stream, { volume: 1 });
    connectionMap.get(message.guild.id).dispatcher = dispatcher;
    await dispatcherControl(message, dispatcher, song);
  } catch (error) {
    LoggerInstance.error(error.message);
    await skipCommandHandler(message);
    message.channel.send(ERROR_MESSAGES.ERROR_PlAYING_SONG);
  }
};

const dispatcherControl = async (message: Message, dispatcher, song) => {
  let msg: Message;
  dispatcher.on('start', async () => {
    if (connectionMap.get(message.guild.id).timer) clearTimeout(connectionMap.get(message.guild.id).timer);
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
    connectionMap.get(message.guild.id).currentSong++;
    if (connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong > 0) {
      playUrl(message, connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong]);
    }
    if (
      connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong === 0 &&
      connectionMap.get(message.guild.id).loop === true
    ) {
      connectionMap.get(message.guild.id).currentSong = 0;
      playUrl(message, connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong]);
    }
    await timer(message);
  });
};

const timer = async message => {
  let timer = setTimeout(async () => {
    await message.guild.me.voice.channel.leave();
    message.channel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE.DESCRIPTION));
  }, 45000);
  connectionMap.get(message.guild.id).timer = timer;
};
