import Discord, { Client, Intents } from 'discord.js';
import config from '../config';
import LoggerInstance from './logger';

let client: Client;

async function initializeClient(): Promise<Client> {
  let intents = new Intents(Intents.NON_PRIVILEGED);
  intents.add('GUILD_MEMBERS');
  client = new Discord.Client({ ws: { intents: intents } });
  client.login(config.TOKEN);
  client.on('ready', () => {
    LoggerInstance.info(`Bot Id: ${client.user.tag}`);
    client.user.setActivity(`your favourite music!`, {
      type: 'PLAYING',
    });
  });
  return client;
}

export default async (): Promise<Client> => {
  if (!client) {
    client = await initializeClient();
  }
  return client;
};
