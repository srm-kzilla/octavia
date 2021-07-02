import { Message } from 'discord.js';
import { connectionMap, playUrl } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { MESSAGES } from '../shared/constants';
import { Play } from '../shared/customTypes';

/**
 * Handles the "previous" command by either invoking the controller to play the previous song or sending an appropriate error message.
 * @param {Message}message The incoming message
 * @returns {Promise<Message>} Return the message after sending it to the user
 */

export const previousCommandHandler = async (message:Message):Promise<Message> => {
  if (userInVoiceChannelCheck) {
    if (((connectionMap.get(message.guild.id) as Play) as Play).queue.length < 2 || (connectionMap.get(message.guild.id) as Play).currentSong === 0)
      return message.channel.send(MESSAGES.CANNOT_PLAY_PREVIOUS_SONG);
    playUrl(message, (connectionMap.get(message.guild.id) as Play).queue[--(connectionMap.get(message.guild.id) as Play).currentSong]);
  }
};
