import { Message } from 'discord.js';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

/**
 * Handles the "leave" and the "stop" command(The application leaves the voice channel).
 * @param {Message} message The incoming message
 */

export const leaveCommandHandler = (message: Message, userMessage: string): void => {
  if (userInVoiceChannelCheck(message)) {
    message.guild.me.voice.channel.leave();
    message.channel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(userMessage));
  }
};
