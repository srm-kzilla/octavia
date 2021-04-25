import LoggerInstance from './loaders/logger';
import { COLOR_CODES, EMBED, ERROR_MESSAGES, MESSAGES, randomNumber, REGEX } from './shared/constants';
import ytdl from 'ytdl-core';
import { Message, StreamDispatcher } from 'discord.js';
import { Play } from './shared/customTypes';
import { resumeCommandHandler } from './commands';
import { spotifyLinkHandler } from './playlistHandler/spotify';
import { playlistYoutube } from './playlistHandler/youtube';
import { validateRegex } from './shared/validation';
import { searchSong, searchTitle } from './shared/yt-search';

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
        let title = await searchTitle(message, songUrl);
        if (title) {
          await queueAdd(message, { title: title, url: songUrl });
        }
      } else {
        message.channel.send(MESSAGES.PLAYLIST_ADDED);
      }
    } else if (validateRegex(songUrl, REGEX.SPOTIFY_REGEX)) {
      await spotifyLinkHandler(message, songUrl);
    } else {
      let song = await searchSong(message, arrayKeywords.slice(2).join());
      if (song.url !== null && song.title !== null) {
        await queueAdd(message, song);
      }
    }
  } catch (error) {
    LoggerInstance.error(error.message);
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};

const connection = async (message: Message) => {
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
    return connectionMap.get(message.guild.id).connection;
  } catch (error) {
    LoggerInstance.error(error.message + '   1  ');
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};

export const queueAdd = async (message, songData) => {
  let music = connectionMap.get(message.guild.id);
  music.queue.push(songData);
  if (music.queue.length - connectionMap.get(message.guild.id).currentSong === 1)
    playUrl(message, music.queue[connectionMap.get(message.guild.id).currentSong]);
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
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};

const dispatcherControl = async (message: Message, dispatcher, song) => {
  try {
    let msg: Message;
    dispatcher.on('start', async () => {
      if (connectionMap.get(message.guild.id).timer) clearTimeout(connectionMap.get(message.guild.id).timer);
      msg = await message.channel.send(
        EMBED()
          .setTitle(`${MESSAGES.SONG_START + song.title}`)
          .setDescription(song.url),
      );
    });
    dispatcher.on('finish', async () => {
      (await message.channel.send(MESSAGES.SONG_OVER + ' ' + song.title)).delete({ timeout: 15000 });
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
  } catch (error) {
    throw error;
  }
};

const timer = async message => {
  try {
    let timer = setTimeout(async () => {
      await message.guild.me.voice.channel.leave();
      message.channel.send(
        EMBED().setColor(COLOR_CODES.LEAVE).setTitle(MESSAGES.LEAVE.TITLE).setDescription(MESSAGES.LEAVE.DESCRIPTION),
      );
    }, 15000);
    connectionMap.get(message.guild.id).timer = timer;
  } catch (error) {
    throw error;
  }
};
