import { connectionMap } from '../controller';
import LoggerInstance from '../loaders/logger';
import { EMBED, ERROR_MESSAGES, randomNumber } from '../shared/constants';
import { lyricsHelper } from '../shared/lyrics';

export const lyricsCommand = async message => {
  try {
    const lyrics = await lyricsHelper(
      `${connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].originalTitle}`,
      `${connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].artistName}`,
    );

    if (!lyrics) return message.channel.send(ERROR_MESSAGES.UNABLE_TO_FIND_LYRICS);
    if (lyrics.length > 2047) message.channel.send(EMBED().setThumbnail('').setDescription(lyrics.substring(0, 2047)));
    else message.channel.send(EMBED().setThumbnail('').setDescription(lyrics));
  } catch (error) {
    LoggerInstance.error(error.message);
    message.channel.send(ERROR_MESSAGES.UNKNOWN_ERROR[randomNumber(ERROR_MESSAGES.UNKNOWN_ERROR.length)]);
  }
};
