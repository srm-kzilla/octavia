import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';

export const helpCommand = message => {
  message.channel.send(
    EMBED()
      .setTitle(MESSAGES.HELP_TITLE)
      .setColor(COLOR_CODES.HELP_COLOR_CODE)
      .setDescription(MESSAGES.HELP_DESCRIPTION),
  );
};
