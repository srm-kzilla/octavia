import { Collection, Guild, GuildChannel, GuildMember, Message } from 'discord.js';
import { connectionMap } from '../controller';
import { COLOR_CODES, EMBED, MESSAGES } from './constants';
import { Play } from './customTypes';

/**
 * Sets the timer for the bot to leave if no further songs are added to the queue.
 * @param {Message} message The incoming message
 * 
 */
export const setTimer = async (message:Message):Promise<void> => {
  let timer = setTimeout(async () => {
    await message.guild.me.voice.channel.leave();
    message.channel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE.DESCRIPTION));
  }, 45000);
  (connectionMap.get(message.guild.id) as Play).timer = timer;
};

/**
 * Counts the number of the users(non-bots) in the voice channel the bot is in and leaves if there are none.
 * @param {Collection<string, GuildMember>}members 
 * @param {Guild} guild The guild's data
 */

export const membersInVoiceChannelCounter = (members:Collection<string, GuildMember>, guild:Guild):void => {
  (connectionMap.get(guild.id) as Play).memberCount = 0;
  members.forEach(element => {
    if (!element.user.bot) (connectionMap.get(guild.id) as Play).memberCount++;
  });
  if ((connectionMap.get(guild.id) as Play).memberCount === 0) leaveIfChannelEmpty(guild);
};

/**
 * Leaves the channel after 15 seconds of inactivity.
 * @param {Guild} guild The guild's data
 */

const leaveIfChannelEmpty = (guild:Guild):void => {
  let textChannel = (connectionMap.get(guild.id) as Play).textChannel;
  textChannel.send(EMBED().setColor(COLOR_CODES.LEAVE).setDescription(MESSAGES.LEAVE_EMPTY));
  setTimeout(() => {
    if ( (connectionMap.get(guild.id) as Play).memberCount < 1 && guild.me.voice.channel) guild.me.voice.channel.leave();
  }, 15000);
};
