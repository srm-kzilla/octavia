import { ERROR_MESSAGES } from './constants';
import yts from 'yt-search';
import LoggerInstance from '../loaders/logger';

export const searchSong = async (message, song) => {
  try {
    const data = (await yts(song)).videos.slice(0, 1);
    if (!data[0]) {
      message.channel.send(ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH);
      return;
    }
    return { title: data[0].title, url: data[0].url };
  } catch (error) {
    LoggerInstance.error(error.message);
  }
};

export const searchTitle = async (message, song) => {
  try {
    const data = (await yts(song)).videos.slice(0, 1);
    if (!data[0]) {
      message.channel.send(ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH);
      return;
    }
    return data[0].title;
  } catch (error) {
    LoggerInstance.error(error.message);
  }
};
