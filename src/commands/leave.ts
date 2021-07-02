import { Message } from 'discord.js';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

/**
 * Handles the "leave" command(The application leaves the voice channel).
 * @param {Message} message The incoming message
 */

export const leaveCommandHandler = (message: Message) : void=> {
  if (userInVoiceChannelCheck(message)) {
    message.guild.me.voice.channel.leave();
    message.channel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE_CHANNEL));
  }
};
