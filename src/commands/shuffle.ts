import { connectionMap } from '../controller';
import { ERROR_MESSAGES } from '../shared/constants';

export const shuffleCommand = message => {
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (!message.guild.me.voice.channel) return message.reply(ERROR_MESSAGES.BOT_NOT_IN_A_VOICE_CHANNEL);
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  if (message.guild.me.voice.channel) {
    if (!(message.member.voice.channelID === message.guild.me.voice.channelID))
      return message.reply(ERROR_MESSAGES.USER_NOT_IN_THE_SAME_CHANNEL);
  }
  if (!connectionMap.get(message.guild.id).queue) return message.channel.send('The queue is empty');
  for (let i = connectionMap.get(message.guild.id).queue.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tempVar = connectionMap.get(message.guild.id).queue[i];
    connectionMap.get(message.guild.id).queue[i] = connectionMap.get(message.guild.id).queue[j];
    connectionMap.get(message.guild.id).queue[j] = tempVar;
  }
};
