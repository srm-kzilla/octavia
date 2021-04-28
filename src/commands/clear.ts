import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const clearCommandHandler = message => {
  if (userInVoiceChannelCheck(message)) {
    connectionMap.get(message.guild.id).dispatcher.destroy();
    connectionMap.get(message.guild.id).currentSong = 0;
    connectionMap.get(message.guild.id).queue = [];
    connectionMap.get(message.guild.id).loop = false;
    message.channel.send(EMBED().setColor(COLOR_CODES.CLEAR).setDescription(MESSAGES.CLEAR_QUEUE));
  }
};
