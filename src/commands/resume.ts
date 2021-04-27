import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const resumeCommand = message => {
  try {
    if (userInVoiceChannelCheck(message)) {
      connectionMap.get(message.guild.id).dispatcher.resume();
      message.channel.send(EMBED().setColor(COLOR_CODES.RESUME).setDescription(MESSAGES.MUSIC_RESUME));
    }
  } catch (error) {
    throw error;
  }
};
