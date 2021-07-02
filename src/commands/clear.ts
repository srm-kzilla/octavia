import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';
import { Play } from '../shared/customTypes';

/**
 * Handles the "cancel" command by destroying the dispatcher and clearing the queue.
 * @param {Message} message The incoming message
 */

export const clearCommandHandler = (message:Message):void => {
  if (userInVoiceChannelCheck(message)) {
    (connectionMap.get(message.guild.id) as Play).dispatcher.destroy();
    (connectionMap.get(message.guild.id) as Play).currentSong = 0;
    (connectionMap.get(message.guild.id) as Play).queue = [];
    (connectionMap.get(message.guild.id) as Play).loop = false;
    message.channel.send(EMBED().setColor(COLOR_CODES.CLEAR).setDescription(MESSAGES.CLEAR_QUEUE));
  }
};
