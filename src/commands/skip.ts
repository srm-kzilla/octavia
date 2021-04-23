import { skipSong } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';

export const skipCommand = async message => {
  if (userInVoiceChannelCheck(message)) await skipSong(message);
};
