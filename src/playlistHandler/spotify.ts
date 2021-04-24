import axios from 'axios';
import { queueAdd } from '../controller';
import { getSpotifyToken as getSpotifyToken } from '../loaders/nodecache';
import { CONSTANT_URL, REGEX } from '../shared/constants';
import { validateRegex } from '../shared/validation';
import { searchSong } from '../shared/yt-search';

export const spotifyLinkHandler = async (message, url) => {
  try {
    let typeOfRequest: string;
    let id: string;
    if (validateRegex(url, REGEX.SPOTIFY_WEB_URL_REGEX)) {
      typeOfRequest = url.split('/')[3];
      id = url.split('/')[4].split('?')[0];
    } else if (validateRegex(url, REGEX.SPOTIFY_URL_REGEX)) {
      typeOfRequest = url.split(':')[1];
      id = url.split(':')[2];
    } else {
      return message.channel.send('Not a valid playlist url');
    }
    switch (typeOfRequest) {
      case 'track':
        await spotifyTrackHandler(message, id);
        break;
      case 'album':
        await spotifyAlbumHandler(message, id);
        break;
      case 'playlist':
        spotifyPlaylistHandler(message, id);
        break;
      default:
        message.channel.send(' try sending a track, playlist or an album');
    }
  } catch (error) {
    throw error;
  }
};

const spotifyTrackHandler = async (message, id) => {
  try {
    let trackData = await axios({
      method: 'GET',
      url: CONSTANT_URL.SPOTIFY_TRACK_API(id),
      headers: { Authorization: `Bearer ${await getSpotifyToken()}` },
    });
    if (!trackData.data.name) return message.channel.send('unable to add playlist');
    await queueAdd(message, await searchSong(message, `${trackData.data.name} ${trackData.data.artists[0].name}`));
  } catch (error) {
    throw error;
  }
};

const spotifyAlbumHandler = async (message, id, next?: string) => {
  try {
    let albumData = await axios({
      method: 'GET',
      url: CONSTANT_URL.SPOTIFY_ALBUM_API(id, next),
      headers: {
        Authorization: `Bearer ${await getSpotifyToken()}`,
      },
    });

    if (!albumData.data) return message.channel.send('unable to add playlist');
    await addSpotifyALbumSongsToQueue(message, albumData.data.items);
    if (albumData.data.next) {
      spotifyAlbumHandler(message, id, albumData.data.next);
    }
  } catch (error) {
    throw error;
  }
};

const spotifyPlaylistHandler = async (message, id, next?: string) => {
  try {
    let playlistData = await axios({
      method: 'GET',
      url: CONSTANT_URL.SPOTIFY_PLAYLIST_API(id, next),
      headers: {
        Authorization: `Bearer ${await getSpotifyToken()}`,
      },
    });
    if (!playlistData.data) return message.channel.send('unable to add playlist');
    await addSpotifyPlaylistSongsToQueue(message, playlistData.data.items);
    if (playlistData.data.next) {
      spotifyPlaylistHandler(message, id, playlistData.data.next);
    }
  } catch (error) {
    throw error;
  }
};

const addSpotifyALbumSongsToQueue = async (message, songs) => {
  try {
    for (let i = 0; i < songs.length; i++) {
      let url = await searchSong(message, `${songs[i].name} ${songs[i].artists[0].name}`);
      if (url) {
        queueAdd(message, {
          title: `${songs[i].name}`,
          url: url.url,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

const addSpotifyPlaylistSongsToQueue = async (message, songs) => {
  try {
    for (let i = 0; i < songs.length; i++) {
      let url = await searchSong(message, `${songs[i].track.name} ${songs[i].track.album.artists[0].name}`);
      if (url) {
        queueAdd(message, {
          title: `${songs[i].track.name}`,
          url: url.url,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};
