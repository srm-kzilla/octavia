import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';
import { Play } from '../shared/customTypes';

/**
 * Handles the "loop" command by looping a queue if the looping is off and the vice versa if the looping is on.
 * @param {Message} message The incoming message
 * @returns {Promise<Message>} Return message sent after looping is turned on/off
 */

export const loopCommandHandler = (message: Message) : Promise<Message>=> {
  if (userInVoiceChannelCheck) {
    if ((connectionMap.get(message.guild.id) as Play).loop === true) {
      (connectionMap.get(message.guild.id) as Play).loop = false;
      return message.channel.send(EMBED().setColor(COLOR_CODES.LOOP_OFF).setDescription(MESSAGES.LOOP_OFF));
    }
    (connectionMap.get(message.guild.id) as Play).loop = true;
    message.channel.send(EMBED().setColor(COLOR_CODES.LOOP_ON).setDescription(MESSAGES.LOOP_ON));
  }
};
