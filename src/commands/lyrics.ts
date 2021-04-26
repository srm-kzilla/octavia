import { getLyrics } from 'genius-lyrics-api';
import config from '../config';
import { connectionMap } from '../controller';
import { EMBED } from '../shared/constants';

export const lyricsCommand = async message => {
  const options = {
    apiKey: config.GENIUS_API_KEY,
    title: `${
      connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].originalTitle
    }`,
    artist: `${connectionMap.get(message.guild.id).queue[connectionMap.get(message.guild.id).currentSong].artistName}`,
    optimizeQuery: true,
  };
  const lyrics = await getLyrics(options);
  message.channel.send(EMBED().setThumbnail('').setDescription(lyrics.substring(0, 2047)));
};
