import { Message } from 'discord.js';
import {
  defaulCasetHandler,
  helpCommandHandler,
  leaveCommandHandler,
  loopCommanHandler,
  playCommandHandler,
  puaseCommandHandler,
  queueCommandHandler,
  resumeCommandHandler,
  shuffleCommandHandler,
  skipCommandHandler,
} from './commands';
import config from './config';
import Loaders from './loaders';
import discord from './loaders/discord';
import LoggerInstance from './loaders/logger';
import { COMMANDS, EMOJIS } from './shared/constants';

const discordHandler = async () => {
  try {
    const client = await discord();
    client.on('message', async (message: Message) => {
      const messageArray = message.content.trim().split(' ');
      if (!message.author.bot && messageArray[0] === config.PREFIX) {
        switch (messageArray[1]) {
          case COMMANDS.HELP:
            helpCommandHandler(message);
            break;
          case COMMANDS.PLAY:
            playCommandHandler(message);
            break;
          case COMMANDS.LEAVE:
            leaveCommandHandler(message);
            break;
          case COMMANDS.QUEUE:
            queueCommandHandler(message);
            break;
          case COMMANDS.SKIP:
            skipCommandHandler(message);
            break;
          case COMMANDS.PAUSE:
            puaseCommandHandler(message);
            break;
          case COMMANDS.RESUME:
            resumeCommandHandler(message);
            break;
          case COMMANDS.LOOP:
            loopCommanHandler(message);
            break;
          case COMMANDS.SHUFFLE:
            shuffleCommandHandler(message);
            break;
          default:
            defaulCasetHandler(message);
            break;
        }
        await message.react(EMOJIS.REACTION_DEFAULT);
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
