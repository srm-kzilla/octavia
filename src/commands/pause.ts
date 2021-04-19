import { connectionMap } from '../controller';
import { channelCheck } from '../shared/auth';
import { ERROR_MESSAGES, MESSAGES } from '../shared/constants';

export const pauseCommand = message => {
  if (channelCheck(message)) {
    connectionMap.get(message.guild.id).dispatcher.pause(true);
    message.reply(MESSAGES.MUSIC_PAUSE);
  }
};
