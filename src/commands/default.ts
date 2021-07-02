import { Message } from 'discord.js';
import { COLOR_CODES, EMBED, ERROR_MESSAGES } from '../shared/constants';

/**
 * Handles all incorrect/non-existent commands entered by an user.
 * @param {Message} message The incoming message
 */

export const defaultCaseHandler = (message:Message):void => {
  message.channel.send(
    EMBED()
      .setColor(COLOR_CODES.WRONG_COMMAND_COLOR_CODE)
      .setTitle(ERROR_MESSAGES.DEFAULT_TITLE)
      .setDescription(ERROR_MESSAGES.DEFAULT_DESCRIPTION),
  );
};
