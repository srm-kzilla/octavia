import { REGEX } from './constants';

export const validateSpotify = url => {
  let pattern = new RegExp(REGEX.SPOTIFY_REGEX);
  return pattern.test(url);
};

export const validateYoutubeUrl = url => {
  let pattern = new RegExp(REGEX.YOUTUBE_REGEX);
  return pattern.test(url);
};

export const validateSpotifyWebUrl = url => {
  let pattern = new RegExp(REGEX.SPOTIFY_WEB_URL_REGEX);
  return pattern.test(url);
};

export const validateSpotifyUrl = url => {
  let pattern = new RegExp(REGEX.SPOTIFY_URL_REGEX);
  return pattern.test(url);
};
