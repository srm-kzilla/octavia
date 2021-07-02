import { Message } from 'discord.js';
import { connectionMap, playUrl } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES } from '../shared/constants';

/**
 * Handles the "skip" command by first checking if all conditions are satisfied or not and then by either skipping the song or sending an appropriate error message
 * @param {Message} message The incoming message
 * @returns {Promise<Message>} Returns the message sent to the user after skipping or throwing an error
 */

export const skipCommandHandler = async (message:Message) : Promise<Message>=> {
  let arrayKeywords = message.content.trim().split(' ');
  if (userInVoiceChannelCheck(message) && arrayKeywords.length < 3) {
    if (connectionMap.get(message.guild.id).queue.length === 0)
      return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.UNABLE_TO_SKIP));
    if (
      connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong === 1 &&
      connectionMap.get(message.guild.id).loop === false
    )
      return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.UNABLE_TO_SKIP));
    else if (
      connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong === 1 &&
      connectionMap.get(message.guild.id).loop === true
    ) {
      connectionMap.get(message.guild.id).currentSong = 0;
      await playUrl(
        message,
        connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong],
      );
    } else if (connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong !== 1)
      await playUrl(
        message,
        connectionMap.get(message.guild.id).queue[++connectionMap.get(message.guild.id).currentSong],
      );
  }
};
