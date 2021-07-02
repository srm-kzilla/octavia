import { Message } from 'discord.js';
import config from '../config';
import { EMBED, ERROR_MESSAGES, MESSAGES, randomNumber } from '../shared/constants';
import { lyricsHelper } from '../shared/lyrics';

/**
 * Handles the "findlyrics" command by searching for it using the Genuis API 
 * @param {Message} message The incoming message
 * @returns {Promise<Message>} Returns the message after sending it to the user
 */

export const lyricsFindCommandHandler = async (message:Message):Promise<Message>=> {
  if (message.content.trim().split(' ').length < 3) return message.channel.send(ERROR_MESSAGES.INCORRECT_SYNTAX);
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
