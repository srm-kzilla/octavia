import { Message } from 'discord.js';
import { kzillaBotAdminCheck } from '../shared/auth';
import { EMBED, MESSAGES } from '../shared/constants';

export const guildCountHandler = async (message: Message): Promise<void> => {
  if (await kzillaBotAdminCheck(message)) {
    let counter = 0,
      listOfGuilds = 'Index\u3000\u3000\u3000Guild Name\n';
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
