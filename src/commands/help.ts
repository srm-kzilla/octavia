import { Message } from 'discord.js';
import config from '../config';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const helpCommandHandler = (message: Message) => {
  message.channel.send(
    EMBED().setThumbnail(config.THUMBNAIL).setTitle(MESSAGES.HELP_TITLE).setDescription(MESSAGES.HELP_DESCRIPTION),
  );
};
