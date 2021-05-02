import { connectionMap } from '../controller';
import { COLOR_CODES, EMBED, MESSAGES } from './constants';

export const setTimer = async message => {
  let timer = setTimeout(async () => {
    await message.guild.me.voice.channel.leave();
    message.channel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE.DESCRIPTION));
  }, 45000);
  connectionMap.get(message.guild.id).timer = timer;
};

export const membersInVoiceChannelCounter = (members, guildID) => {
  connectionMap.get(guildID).memberCount = 0;
  members.forEach(element => {
    if (!element.user.bot) connectionMap.get(guildID).memberCount++;
  });
  console.log(connectionMap.get(guildID).memberCount);
};

export const leaveIfChannelEmpty = message => {
  message.channel.send('This channel is empty. i will leave the channel in 15 seconds if you do not join!');
  setTimeout(() => {
    if (connectionMap.get(message.guild.id).memberCount < 1) message.guild.me.voice.channel.leave();
  }, 15000);
};
