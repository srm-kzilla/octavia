import { Message } from 'discord.js';
import { ERROR_MESSAGES, MESSAGES } from '../shared/constants';

export const leaveCommand = (message: Message) => {
  if (!message.guild.me.voice.channel) return message.reply(ERROR_MESSAGES.BOT_NOT_IN_A_VOICE_CHANNEL);
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (!(message.member.voice.channelID === message.guild.me.voice.channelID))
    return message.reply(ERROR_MESSAGES.USER_NOT_IN_THE_SAME_CHANNEL);
  message.guild.me.voice.channel.leave();
  message.reply(MESSAGES.LEAVE_CHANNEL);
};
