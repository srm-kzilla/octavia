import { getLyrics } from 'genius-lyrics-api';
import config from '../config';
import { connectionMap } from '../controller';
import LoggerInstance from '../loaders/logger';
import { EMBED, ERROR_MESSAGES, randomNumber } from '../shared/constants';

export const lyricsCommand = async message => {
  try {
    const options = {
      apiKey: config.GENIUS_API_KEY,
      title: `${
        connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].originalTitle
      }`,
      artist: `${
        connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].artistName
      }`,
      optimizeQuery: true,
    };
    const lyrics = await getLyrics(options);
    if (!lyrics) return message.channel.send(ERROR_MESSAGES.UNABLE_TO_FIND_LYRICS);
    message.channel.send(EMBED().setThumbnail('').setDescription(lyrics.substring(0, 2047)));
  } catch (error) {
    LoggerInstance.error(error.message);
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};
