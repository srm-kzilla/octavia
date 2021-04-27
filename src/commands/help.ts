import { Message } from 'discord.js';
import config from '../config';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const helpCommand = (message: Message) => {
  try {
    message.channel.send(
      EMBED()
        .setThumbnail(config.THUMBNAIL)
        .setTitle(MESSAGES.HELP_TITLE)
        .setColor(COLOR_CODES.HELP_COLOR_CODE)
        .setDescription(MESSAGES.HELP_DESCRIPTION),
    );
  } catch (error) {
    throw error;
  }
};
