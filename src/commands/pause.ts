import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const pauseCommandHandler = message => {
  if (userInVoiceChannelCheck(message)) {
    connectionMap.get(message.guild.id).dispatcher.pause(true);
    message.channel.send(EMBED().setColor(COLOR_CODES.PAUSE).setDescription(MESSAGES.MUSIC_PAUSE));
  }
};
