import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const clearCommand = message => {
  try {
    if (userInVoiceChannelCheck(message)) {
      connectionMap.get(message.guild.id).dispatcher.destroy();
      connectionMap.get(message.guild.id).currentSong = 0;
      connectionMap.get(message.guild.id).queue = [];
      message.channel.send(EMBED().setColor(COLOR_CODES.CLEAR).setDescription(MESSAGES.CLEAR_QUEUE));
    }
  } catch (error) {
    throw error;
  }
};