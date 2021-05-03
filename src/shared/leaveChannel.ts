import { connectionMap } from '../controller';
import { COLOR_CODES, EMBED, MESSAGES } from './constants';

export const setTimer = async message => {
  let timer = setTimeout(async () => {
    await message.guild.me.voice.channel.leave();
    message.channel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE.DESCRIPTION));
  }, 45000);
  connectionMap.get(message.guild.id).timer = timer;
};

export const membersInVoiceChannelCounter = (members, guild) => {
  connectionMap.get(guild.id).memberCount = 0;
  members.forEach(element => {
    if (!element.user.bot) connectionMap.get(guild.id).memberCount++;
  });
  if (connectionMap.get(guild.id).memberCount === 0) leaveIfChannelEmpty(guild);
};

const leaveIfChannelEmpty = guild => {
  let textChannel = connectionMap.get(guild.id).textChannel;
  textChannel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE_EMPTY));
  setTimeout(() => {
    if (connectionMap.get(guild.id).memberCount < 1 && guild.me.voice.channel) guild.me.voice.channel.leave();
  }, 15000);
};
