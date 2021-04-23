import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { MESSAGES } from '../shared/constants';

export const loopCommand = (message: Message) => {
  if (userInVoiceChannelCheck) {
    if (connectionMap.get(message.guild.id).loop === true) {
      connectionMap.get(message.guild.id).loop = false;
      return message.reply(MESSAGES.LOOP_OFF);
    }
    connectionMap.get(message.guild.id).loop = true;
    message.reply(MESSAGES.LOOP_ON);
  }
};
