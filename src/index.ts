import { Message } from 'discord.js';
import { defaulCasetHandler, helpCommandHandler, leaveCommandHandler, playCommandHandler } from './commands.ts';
import config from './config';
import Loaders from './loaders';
import discord from './loaders/discord';
import LoggerInstance from './loaders/logger';

const discordHandler = async () => {
  try {
    const client = await discord();
    client.on('message', (message: Message) => {
      const messageArray = message.content.trim().split(' ');
      if (!message.author.bot && messageArray[0] === config.PREFIX) {
        switch (messageArray[1]) {
          case 'help':
            helpCommandHandler(message);
            break;
          case 'play':
            playCommandHandler(message);
            break;
          case 'leave':
            leaveCommandHandler(message);
            break;
          default:
            defaulCasetHandler(message);
            break;
        }
      }
    });
  } catch (error) {
    LoggerInstance.error(error.message);
  }
};

async function startServer() {
  await Loaders();
  discordHandler();
}
startServer();
