import { connectionMap } from '../controller';
import { EMBED, ERROR_MESSAGES } from '../shared/constants';

export const queueCommand = message => {
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (!message.guild.me.voice.channel) return message.reply(ERROR_MESSAGES.BOT_NOT_IN_A_VOICE_CHANNEL);
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (message.guild.me.voice.channel) {
    if (!(message.member.voice.channelID === message.guild.me.voice.channelID))
      return message.reply(ERROR_MESSAGES.USER_NOT_IN_THE_SAME_CHANNEL);
  }
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
};
