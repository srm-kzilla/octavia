import { COLOR_CODES, EMBED, ERROR_MESSAGES } from './constants';
import yts from 'yt-search';
import LoggerInstance from '../loaders/logger';
import { Message } from 'discord.js';

/**
 * Search for a song using the title.
 * @param {Message} message The incoming message
 * @param {string} song The song title
 * @returns {Promise<{ title: string;    url: string;    artistName: string;    timestamp: string;}>} Returns the song info
 */

export const searchSong = async (message:Message, song:string):Promise<{
    title: string;
    url: string;
    artistName: string;
    timestamp: string;
}> => {
  const data = (await yts(song)).videos.slice(0, 1);
  if (!data[0]) {
    throw { code: 404, message: ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH };
  }
  return { title: data[0].title, url: data[0].url, artistName: data[0].author.name, timestamp: data[0].timestamp };
};

/**
 * Searches for a song using the URL
 * @param {Message} message The incoming message
 * @param {string} song The song title
 * @returns {Promise<{    title: string;    artistName: string;    timestamp: string;}>} Returns the song's details
 */

export const searchTitle = async ( message: Message, song:string):Promise<{
    title: string;
    artistName: string;
    timestamp: string;
}> => {
  const data = (await yts(song)).videos.slice(0, 1);
  if (!data[0]) {
    throw { code: 404, message: ERROR_MESSAGES.UNABLE_TO_FIND_A_MATCH };
  }
  return { title: data[0].title, artistName: data[0].author.name, timestamp: data[0].timestamp };
};
