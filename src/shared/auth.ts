import { Message } from 'discord.js';
import config from '../config';
import { ERROR_MESSAGES } from './constants';

/**
 * Checks whether the user is in a voice channel or not.
 * @param {Message} message The incoming message
 * @returns {boolean} Returns a boolean value
 */

export const userInVoiceChannelCheck = (message: Message): boolean => {
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

export const kzillaBotAdminCheck = async (message: Message) => {
  if (message.member.roles.cache.find(role => role.id === config.KZILLA_BOT_ADMIN_ID)) return true;
  message.reply(ERROR_MESSAGES.USER_NOT_ADMIN);
  return false;
};
