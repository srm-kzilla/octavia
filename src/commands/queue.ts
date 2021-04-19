import { connectionMap } from '../controller';
import { channelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES } from '../shared/constants';

export const queueCommand = message => {
  if (channelCheck(message)) {
    let queueList: string = ``;
    let queueArray = connectionMap.get(message.guild.id).queue;
    if (queueArray) {
      for (let i = 0; i < queueArray.length; i++) {
        if (i === connectionMap.get(message.guild.id).currentSong)
          queueList = queueList + `**current song**=> ${queueArray[i].title} \n`;
        else queueList = queueList + `**${i + 1}**=> ${queueArray[i].title} \n`;
      }
      message.channel.send(EMBED().setDescription(queueList).setTitle('You song queue:'));
    }
  }
};
