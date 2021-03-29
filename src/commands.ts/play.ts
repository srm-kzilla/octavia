import { playRequest } from '../controller';
import { ERROR_MESSAGES } from '../shared/constants';
export let connection;
export const playCommand = message => {
  if (!message.member.voice.channel) return message.reply(ERROR_MESSAGES.USER_NOT_IN_A_VOICE_CHANNEL);
  playRequest(message);
};
