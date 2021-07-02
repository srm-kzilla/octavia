import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES, MESSAGES } from '../shared/constants';

/**
 * Handles the "shuffle" command by shuffling all of the songs except the current song
 * @param {Message} message The incoming message
 * @returns {Promise<Message>} Send the user a message and then returns that
 */

export const shuffleCommandHandler = (message:Message):Promise<Message> => {
  if (userInVoiceChannelCheck(message)) {
    if (!connectionMap.get(message.guild.id).queue)
      return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.QUEUE_EMPTY));
    for (let i = connectionMap.get(message.guild.id).queue.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      if (
        j !== connectionMap.get(message.guild.id).currentSong &&
        i !== connectionMap.get(message.guild.id).currentSong
      ) {
        let tempVar = connectionMap.get(message.guild.id).queue[i];
        connectionMap.get(message.guild.id).queue[i] = connectionMap.get(message.guild.id).queue[j];
        connectionMap.get(message.guild.id).queue[j] = tempVar;
      }
    }
    message.channel.send(EMBED().setDescription(MESSAGES.SHUFFLE_MUSIC));
  }
};
