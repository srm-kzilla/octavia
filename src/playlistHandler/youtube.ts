import { queueAdd } from '../controller';
import LoggerInstance from '../loaders/logger';
import { CONSTANT_URL, ERROR_MESSAGES, REGEX } from '../shared/constants';
import axios from 'axios';

export const playlistYoutube = async (message, url: string, nextPageToken?: string) => {
  try {
    if (!(url.indexOf('list=') > 5)) return false;
    let listID = url.substring(url.indexOf('list=') + 5, url.indexOf('&', url.indexOf('list=')));
    let list = await axios({
      method: 'get',
      url: CONSTANT_URL.YOUTUBE_API(listID, nextPageToken),
      responseType: 'json',
    });
    if (!list) {
      message.reply(ERROR_MESSAGES.UNABLE_TO_FIND_PLAYLIST);
      return false;
    }
    await addPlaylistSongToQueue(list, message);
    if (list.data.nextPageToken) {
      let nextPageToken = list.data.nextPageToken;
      await playlistYoutube(message, url, nextPageToken);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const addPlaylistSongToQueue = async (list, message) => {
  for (let i = 0; i < list.data.items.length; i++) {
    queueAdd(message, {
      title: `${list.data.items[i].snippet.title}`,
      url: CONSTANT_URL.SONG_URL(list.data.items[i].contentDetails.videoId),
    });
  }
};
