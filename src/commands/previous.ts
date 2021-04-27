import { connectionMap, playUrl } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { MESSAGES } from '../shared/constants';

export const previousCommand = async message => {
  try {
    if (userInVoiceChannelCheck) {
      if (connectionMap.get(message.guild.id).queue.length < 2 || connectionMap.get(message.guild.id).currentSong === 0)
        return message.channel.send(MESSAGES.CANNOT_PLAY_PREVIOUS_SONG);
      playUrl(message, connectionMap.get(message.guild.id).queue[--connectionMap.get(message.guild.id).currentSong]);
    }
  } catch (error) {
    throw error;
  }
};
