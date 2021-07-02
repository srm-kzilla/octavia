import { getLyrics } from 'genius-lyrics-api';
import config from '../config';

/**
 * Fetches the lyrics of a song from the genuis API.
 * @param {string} title The title of the song
 * @param {string} artist The name of the artist of the song
 * @returns Returns the lyrics from the Genuis api
 */

export const lyricsHelper = async (title:string, artist:string) => {
  const options = {
    apiKey: config.GENIUS_API_KEY,
    title: title,
    artist: artist,
    optimizeQuery: true,
  };
  const lyrics = await getLyrics(options);
  return lyrics;
};
