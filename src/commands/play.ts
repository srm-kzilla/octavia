import { Message } from 'discord.js';
import { playRequest } from '../controller';
import { ERROR_MESSAGES } from '../shared/constants';

/**
 * Handles the "play" command by either passing the request to the controller or returning an appropriate error message
 * @param {Message} message The incoming message
 * @returns {Promise<Message>} Returns the message
 */
export const playCommandHandler = (message: Message):Promise<Message> => {
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (message.guild.me.voice.channel) {
    if (!(message.member.voice.channelID === message.guild.me.voice.channelID))
      return message.reply(ERROR_MESSAGES.USER_NOT_IN_THE_SAME_CHANNEL);
  }
  playRequest(message);
};
