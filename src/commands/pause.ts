import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { COLOR_CODES, EMBED, MESSAGES } from '../shared/constants';
import { Play } from '../shared/customTypes';

export const pauseCommandHandler = (message: Message) => {
  if (userInVoiceChannelCheck(message)) {
    (connectionMap.get(message.guild.id) as Play).dispatcher.pause(true);
    message.channel.send(EMBED().setColor(COLOR_CODES.PAUSE).setDescription(MESSAGES.MUSIC_PAUSE));
  }
};
