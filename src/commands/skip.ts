import { connectionMap, playUrl } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES } from '../shared/constants';

export const skipCommandHandler = async message => {
  if (userInVoiceChannelCheck(message)) {
    if (connectionMap.get(message.guild.id).queue.length === 0)
      return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.UNABLE_TO_SKIP));
    if (
      connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong === 1 &&
      connectionMap.get(message.guild.id).loop === false
    )
      return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.UNABLE_TO_SKIP));
    else if (
      connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong === 1 &&
      connectionMap.get(message.guild.id).loop === true
    ) {
      connectionMap.get(message.guild.id).currentSong = 0;
      await playUrl(
        message,
        connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong],
      );
    } else if (connectionMap.get(message.guild.id).queue.length - connectionMap.get(message.guild.id).currentSong !== 1)
      await playUrl(
        message,
        connectionMap.get(message.guild.id).queue[++connectionMap.get(message.guild.id).currentSong],
      );
  }
};
