import config from '../config';
import { EMBED, ERROR_MESSAGES, MESSAGES, randomNumber } from '../shared/constants';
import { lyricsHelper } from '../shared/lyrics';

export const lyricsFindCommandHandler = async message => {
  message.channel.send(MESSAGES.FETCHING_LYRICS[randomNumber(MESSAGES.FETCHING_LYRICS.length)]);
  let songDetails = message.content
    .trim()
    .substring(message.content.trim().indexOf(' ', config.PREFIX.length + 2))
    .trim()
    .split(',');
  let lyrics = await lyricsHelper(songDetails[0], songDetails[1]);
  if (songDetails.length !== 2) return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.INCORRECT_SYNTAX));
  if (!lyrics) return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.UNABLE_TO_FIND_LYRICS));
  if (lyrics.length > 2040) message.channel.send(EMBED().setDescription(`${lyrics.substring(0, 2040)}...`));
  else message.channel.send(EMBED().setDescription(lyrics));
};
