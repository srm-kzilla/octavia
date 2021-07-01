import { connectionMap, playUrl } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, ERROR_MESSAGES } from '../shared/constants';

export const skiptoCommandHandler = async message => {
  let arrayKeywords = message.content.trim().split(' ');
  if (arrayKeywords.length < 3)
    return message.channel.send(
      EMBED().setDescription(ERROR_MESSAGES.INCORRECT_SYNTAX).setColor(COLOR_CODES.WRONG_COMMAND_COLOR_CODE),
    );
  if (userInVoiceChannelCheck(message)) {
    arrayKeywords[2] = parseInt(arrayKeywords[2]);
    if (isNaN(arrayKeywords[2]))
      return message.channel.send(
        EMBED()
          .setDescription(ERROR_MESSAGES.SKIP_TO_ERROR.NOT_A_NUMBER)
          .setColor(COLOR_CODES.WRONG_COMMAND_COLOR_CODE),
      );
    if (arrayKeywords[2] > connectionMap.get(message.guild.id).queue.length)
      return message.channel.send(
        EMBED()
          .setColor(COLOR_CODES.WRONG_COMMAND_COLOR_CODE)
          .setDescription(ERROR_MESSAGES.SKIP_TO_ERROR.NOT_IN_QUEUE),
      );
    await playUrl(message, connectionMap.get(message.guild.id).queue[--arrayKeywords[2]]);
  }
};
