import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const loopCommandHandler = (message: Message) => {
  if (userInVoiceChannelCheck) {
    if (connectionMap.get(message.guild.id).loop === true) {
      connectionMap.get(message.guild.id).loop = false;
      return message.channel.send(EMBED().setColor(COLOR_CODES.LOOP_OFF).setDescription(MESSAGES.LOOP_OFF));
    }
    connectionMap.get(message.guild.id).loop = true;
    message.channel.send(EMBED().setColor(COLOR_CODES.LOOP_ON).setDescription(MESSAGES.LOOP_ON));
  }
};
