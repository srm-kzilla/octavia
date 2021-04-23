import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { MESSAGES } from '../shared/constants';

export const resumeCommand = message => {
  if (userInVoiceChannelCheck(message)) {
    connectionMap.get(message.guild.id).dispatcher.resume();
    message.channel.send(MESSAGES.MUSIC_RESUME);
  }
};
