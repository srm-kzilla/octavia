import { COLOR_CODES, EMBED, ERROR_MESSAGES } from './constants';
import yts from 'yt-search';
import LoggerInstance from '../loaders/logger';

export const searchSong = async (message, song) => {
  const data = (await yts(song)).videos.slice(0, 1);
  if (!data[0]) {
    throw { code: 404, message: ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH };
  }
  return { title: data[0].title, url: data[0].url, artistName: data[0].author.name, timestamp: data[0].timestamp };
};

export const searchTitle = async (message, song) => {
  const data = (await yts(song)).videos.slice(0, 1);
  if (!data[0]) {
    throw { code: 404, message: ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH };
  }
  return { title: data[0].title, artistName: data[0].author.name, timestamp: data[0].timestamp };
};
