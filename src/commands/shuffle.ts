import { connectionMap } from '../controller';
import { channelCheck } from '../shared/auth';

export const shuffleCommand = message => {
  if (channelCheck(message)) {
    if (!connectionMap.get(message.guild.id).queue) return message.channel.send('The queue is empty');
    for (let i = connectionMap.get(message.guild.id).queue.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tempVar = connectionMap.get(message.guild.id).queue[i];
      connectionMap.get(message.guild.id).queue[i] = connectionMap.get(message.guild.id).queue[j];
      connectionMap.get(message.guild.id).queue[j] = tempVar;
    }
  }
};
