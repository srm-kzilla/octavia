import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { ERROR_MESSAGES, MESSAGES } from '../shared/constants';

export const loopCommand = (message: Message) => {
  if (!message.guild.me.voice.channel) return message.reply(ERROR_MESSAGES.BOT_NOT_IN_A_VOICE_CHANNEL);
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (!(message.member.voice.channelID === message.guild.me.voice.channelID))
    return message.reply(ERROR_MESSAGES.USER_NOT_IN_THE_SAME_CHANNEL);
  if (connectionMap.get(message.guild.id).loop === true) {
    connectionMap.get(message.guild.id).loop = false;
    return message.reply(MESSAGES.LOOP_OFF);
  }
  connectionMap.get(message.guild.id).loop = true;
  message.reply(MESSAGES.LOOP_ON);
};
