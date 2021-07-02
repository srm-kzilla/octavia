import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';
import { Play } from '../shared/customTypes';

/**
 * Handles the "resume" command by first resuming the dispatcher and then sending an appropriate message to the user
 * @param {Message}message The incoming message
 */
export const resumeCommandHandler = (message: Message):void => {
  if (userInVoiceChannelCheck(message)) {
    (connectionMap.get(message.guild.id) as Play).dispatcher.resume();
    message.channel.send(EMBED().setColor(COLOR_CODES.RESUME).setDescription(MESSAGES.MUSIC_RESUME));
  }
};
