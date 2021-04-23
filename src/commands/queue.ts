import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES } from '../shared/constants';

export const queueCommand = message => {
  if (userInVoiceChannelCheck(message)) {
    let queueList: string = ``;
    let queueArray = connectionMap.get(message.guild.id).queue;
    if (queueArray) {
      if (queueArray.length < 12) {
        for (let i = 0; i < queueArray.length; i++) {
          if (i === connectionMap.get(message.guild.id).currentSong)
            queueList = queueList + `**current song**=> ${queueArray[i].title} \n`;
          else queueList = queueList + `**${i + 1}**=> ${queueArray[i].title} \n`;
        }
      } else {
        for (let i = 0; i < queueArray.length; i++) {
          if (Math.abs(connectionMap.get(message.guild.id).currentSong - i) < 8) {
            if (i === connectionMap.get(message.guild.id).currentSong)
              queueList = queueList + `**current song**=> ${queueArray[i].title} \n`;
            else queueList = queueList + `**${i + 1}**=> ${queueArray[i].title} \n`;
          }
        }
      }
      message.channel.send(EMBED().setDescription(queueList).setTitle('You song queue:'));
    }
  }
};
