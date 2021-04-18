import { Message } from 'discord.js';
import { playRequest } from '../controller';
import { ERROR_MESSAGES } from '../shared/constants';
export let connection;
export const playCommand = (message: Message) => {
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (message.guild.me.voice.channel) {
    if (!(message.member.voice.channelID === message.guild.me.voice.channelID))
      return message.reply(ERROR_MESSAGES.USER_NOT_IN_THE_SAME_CHANNEL);
  }
  playRequest(message);
};
