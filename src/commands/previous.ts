import { previousSong } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';

export const previousCommand = async message => {
  if (userInVoiceChannelCheck) {
    previousSong(message);
  }
};
