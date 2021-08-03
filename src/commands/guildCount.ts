import { Message } from 'discord.js';
import config from '../config';
import { kzillaBotAdminCheck } from '../shared/auth';
import { EMBED, MESSAGES } from '../shared/constants';

/**
 * Fetches and sends the list of guilds the bot is in.
 * @param {Message} message The incoming message
 */

export const guildCountHandler = async (message: Message): Promise<void> => {
  if (await kzillaBotAdminCheck(message)) {
    let counter = 0,
      listOfGuilds = `${config.DISCORD_BOT_NAME} is in **${message.client.guilds.cache.size} guilds**! 🎉🥳\n\n**Index**\u3000\u3000\u3000**Guild Name**\n`;
    message.client.guilds.cache.each(value => {
      listOfGuilds += `${++counter}\u3000\u3000\u3000\u3000\u3000${value.name}\n`;
    });
    while (listOfGuilds.length > 0) {
      message.channel.send(EMBED().setTitle(MESSAGES.GUILD_COUNT_MESSAGE).setDescription(listOfGuilds));
      listOfGuilds.length > 2000
        ? (listOfGuilds = listOfGuilds.substring(2000, listOfGuilds.length))
        : (listOfGuilds = '');
    }
  }
};
