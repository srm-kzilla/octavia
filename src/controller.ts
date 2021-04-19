import LoggerInstance from './loaders/logger';
import { EMBED, ERROR_MESSAGES, MESSAGES, randomNumber, REGEX } from './shared/constants';
import ytdl from 'ytdl-core';
import { Message, StreamDispatcher } from 'discord.js';
import yts from 'yt-search';
import { Play } from './shared/customTypes';

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
      LoggerInstance.info(`Joined the voice channel: ${message.guild.me.voice.channel}`);
      connectionMap.set(message.guild.id, music);
    }
    let arrayKeywords = message.content.trim().split(' ');
    if (arrayKeywords.length < 3) return message.reply(ERROR_MESSAGES.NO_SONG_URL_OR_KEYWORD);
    let songUrl = arrayKeywords[2];
    if (!validateUrl(songUrl)) {
      let song = await searchSong(arrayKeywords.slice(2).join());
      if (song.url !== null) {
        await queueAdd(message, song);
      } else message.reply(ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH);
    }
    if (validateUrl(songUrl)) {
      await queueAdd(message, { title: await searchTitle(songUrl), url: songUrl });
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
      LoggerInstance.info(`Joined the voice channel: ${message.guild.me.voice.channel}`);
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

const validateUrl = url => {
  var pattern = new RegExp(REGEX.YOUTUBE_REGEX);
  return pattern.test(url);
};

const playUrl = async (message, song) => {
  try {
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
      timer(message);
    });
  } catch (error) {
    LoggerInstance.error(error.message);
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};

const searchSong = async song => {
  const data = (await yts(song)).videos.slice(0, 1);
  return { title: data[0].title, url: data[0].url };
};

const searchTitle = async song => {
  const data = (await yts(song)).videos.slice(0, 1);
  return data[0].title;
};

export const skipSong = async message => {
  if (
    connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong === 1 &&
    connectionMap.get(message.guild.id).loop === false
  )
    return message.reply(ERROR_MESSAGES.UNABLE_TO_SKIP);
  else if (
    connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong === 1 &&
    connectionMap.get(message.guild.id).loop === true
  ) {
    connectionMap.get(message.guild.id).currentSong = 0;
    playUrl(message, connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong]);
  } else if (connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong !== 1)
    playUrl(message, connectionMap.get(message.guild.id).queue[++connectionMap.get(message.guild.id).currentSong]);
};

const timer = async message => {
  let timer = setTimeout(() => {
    message.guild.me.voice.channel.leave();
  }, 15000);
  connectionMap.get(message.guild.id).timer = timer;
};
