import LoggerInstance from './loaders/logger';
import { EMBED, ERROR_MESSAGES, MESSAGES, randomNumber, REGEX } from './shared/constants';
import ytdl from 'ytdl-core';
import { VoiceConnection } from 'discord.js';
import yts from 'yt-search';

const connectionMap = new Map();

const connection = async message => {
  try {
    if (!message.guild.me.voice.channel) {
      let connection = await message.member.voice.channel.join();
      LoggerInstance.info(`Joined the voice channel: ${message.guild.me.voice.channel}`);
      connectionMap.set(message.guild.id, connection);
    }
    if (!(message.guild.me.voice.channelID === message.member.voice.channelID)) {
      let connection = await message.member.voice.channel.join();
      LoggerInstance.info(`Joined the voice channel: ${message.guild.me.voice.channel}`);
      connectionMap.set(message.guild.id, connection);
    }
    let connection: VoiceConnection = connectionMap.get(message.guild.id);
    return connection;
  } catch (error) {
    LoggerInstance.error(error.message);
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};

export const playRequest = async message => {
  try {
    let arrayKeywords = message.content.trim().split(' ');
    if (arrayKeywords.length < 3) return message.reply(ERROR_MESSAGES.NO_SONG_URL_OR_KEYWORD);
    let songUrl = arrayKeywords[2];
    if (!validateUrl(songUrl)) {
      let song = await searchSong(arrayKeywords.slice(2).join());
      if (song.url !== null) {
        playUrl(message, song);
      } else message.reply(ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH);
    }
    if (validateUrl(songUrl)) await playUrl(message, { title: songUrl, url: songUrl });
  } catch (error) {
    LoggerInstance.error(error.message);
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};

const validateUrl = url => {
  var pattern = new RegExp(REGEX.YOUTUBE_REGEX);
  return pattern.test(url);
};

const playUrl = async (message, songData) => {
  try {
    let stream = ytdl(songData.url, { filter: 'audioonly' });
    let dispatcher = (await connection(message)).play(stream, { volume: 1 });
    dispatcher.on('start', () => {
      message.channel.send(
        EMBED()
          .setTitle(`${MESSAGES.SONG_START + songData.title}`)
          .setDescription(songData.url),
      );
    });
    dispatcher.on('finish', () => {
      message.channel.send(MESSAGES.SONG_OVER);
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
