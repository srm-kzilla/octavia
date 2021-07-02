import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { EMBED, ERROR_MESSAGES, MESSAGES, randomNumber } from '../shared/constants';
import { Play } from '../shared/customTypes';
import { lyricsHelper } from '../shared/lyrics';

/**
 * Handles the "lyrics" command by either fetching the lyrics or sending an appropriate error message
 * @param {Message} message The incoming message
 * @returns {Promise<Message>} Returns the message after sending the lyrics to the user.
 */

export const lyricsCommandHandler = async (message:Message):Promise<Message> => {
  message.channel.send(MESSAGES.FETCHING_LYRICS[randomNumber(MESSAGES.FETCHING_LYRICS.length)]);
  let lyrics = await lyricsHelper(
    `${(connectionMap.get(message.guild.id) as Play).queue[(connectionMap.get(message.guild.id) as Play).currentSong].originalTitle}`,
    `${(connectionMap.get(message.guild.id) as Play).queue[(connectionMap.get(message.guild.id) as Play).currentSong].artistName}`,
  );
  if (!lyrics) return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.UNABLE_TO_FIND_LYRICS));
  if (lyrics.length > 1900)
    message.channel.send(
      EMBED()
        .setThumbnail('')
        .setDescription(`${lyrics.substring(0, 1900)}... \n\n${MESSAGES.USE_FIND_LYRICS_COMMANDS}`),
    );
  else
    message.channel.send(
      EMBED().setThumbnail('').setDescription(`${lyrics}... \n\n${MESSAGES.USE_FIND_LYRICS_COMMANDS}`),
    );
};
