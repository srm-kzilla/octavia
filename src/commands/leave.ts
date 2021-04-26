import { Message } from 'discord.js';
import { userInVoiceChannelCheck } from '../shared/auth';
import { MESSAGES } from '../shared/constants';

export const leaveCommand = (message: Message) => {
  if (userInVoiceChannelCheck(message)) {
    message.guild.me.voice.channel.leave();
    message.reply(MESSAGES.LEAVE_CHANNEL);
  }
};
