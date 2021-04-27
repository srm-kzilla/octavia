import { getLyrics } from 'genius-lyrics-api';
import config from '../config';

export const lyricsHelper = async (title, artist) => {
  try {
    const options = {
      apiKey: config.GENIUS_API_KEY,
      title: title,
      artist: artist,
      optimizeQuery: true,
    };
    const lyrics = await getLyrics(options);
    return lyrics;
  } catch (error) {
    throw error;
  }
};
