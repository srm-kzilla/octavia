import { ERROR_MESSAGES } from './constants';

export const channelCheck = message => {
  if (!message.member.voice.channel) {
    message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
    return false;
  }
  if (!message.guild.me.voice.channel) {
    message.reply(ERROR_MESSAGES.BOT_NOT_IN_A_VOICE_CHANNEL);
    return false;
  }
  if (message.guild.me.voice.channel) {
    if (!(message.member.voice.channelID === message.guild.me.voice.channelID)) {
      message.reply(ERROR_MESSAGES.USER_NOT_IN_THE_SAME_CHANNEL);
      return false;
    }
  }
  return true;
};
