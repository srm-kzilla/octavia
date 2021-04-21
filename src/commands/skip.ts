import { skipSong } from '../controller';
import { channelCheck } from '../shared/auth';

export const skipCommand = async message => {
  if (channelCheck(message)) await skipSong(message);
};
