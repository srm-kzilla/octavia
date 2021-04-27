import { Message } from 'discord.js';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const leaveCommand = (message: Message) => {
  try {
    if (userInVoiceChannelCheck(message)) {
      message.guild.me.voice.channel.leave();
      message.channel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE_CHANNEL));
    }
  } catch (error) {
    throw error;
  }
};
