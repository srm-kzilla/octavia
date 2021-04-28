import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES, MESSAGES } from '../shared/constants';

export const shuffleCommandHandler = message => {
  if (userInVoiceChannelCheck(message)) {
    if (!connectionMap.get(message.guild.id).queue)
      return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.QUEUE_EMPTY));
    for (let i = connectionMap.get(message.guild.id).queue.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tempVar = connectionMap.get(message.guild.id).queue[i];
      connectionMap.get(message.guild.id).queue[i] = connectionMap.get(message.guild.id).queue[j];
      connectionMap.get(message.guild.id).queue[j] = tempVar;
    }
    message.channel.send(EMBED().setDescription(MESSAGES.SHUFFLE_MUSIC));
  }
};
