import { connectionMap } from '../controller';
import { EMBED, ERROR_MESSAGES, MESSAGES, randomNumber } from '../shared/constants';
import { lyricsHelper } from '../shared/lyrics';

export const lyricsCommandHandler = async message => {
  message.channel.send(MESSAGES.FETCHING_LYRICS[randomNumber(MESSAGES.FETCHING_LYRICS.length)]);
  let lyrics = await lyricsHelper(
    `${connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].originalTitle}`,
    `${connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].artistName}`,
  );
  if (!lyrics) return message.channel.send(EMBED().setDescription(ERROR_MESSAGES.UNABLE_TO_FIND_LYRICS));
  if (lyrics.length > 1900)
    message.channel.send(
      EMBED()
        .setThumbnail('')
        .setDescription(`${lyrics.substring(0, 1900)}... \n\n${MESSAGES.USE_FIND_LYRICS_COMMANDS}`),
    );
  else
    message.channel.send(
      EMBED().setThumbnail('').setDescription(`${lyrics}... \n\n${MESSAGES.USE_FIND_LYRICS_COMMANDS}`),
    );
};
