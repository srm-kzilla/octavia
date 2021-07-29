import Discord, { Client, Intents } from 'discord.js';
import config from '../config';
import LoggerInstance from './logger';

let client: Client;

/**
 * Return a Discord client instance
 * @returns {Promise<Client>} Return a client instance
 */
async function initializeClient(): Promise<Client> {
  let intents = new Intents(Intents.NON_PRIVILEGED);
  intents.add(['GUILD_MEMBERS', 'GUILD_PRESENCES']);
  client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], ws: { intents: intents } });
  client.login(config.TOKEN);
  client.on('ready', () => {
    LoggerInstance.info(`Bot Id: ${client.user.tag}`);
    client.user.setActivity(`${config.PREFIX}`, {
      type: 'LISTENING',
    });
  });
  return client;
}

/**
 * Return a Discord Client, or initiate one if not present
 * @returns {Promise<Client>} Return a Discord client instance
 */
export default async (): Promise<Client> => {
  if (!client) {
    client = await initializeClient();
  }
  return client;
};
