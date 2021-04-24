import LoggerInstance from './logger';
import SpotifyWebApi from 'spotify-web-api-node';
import config from '../config';

export const spotifyGetToken = async () => {
  try {
    let spotifyApi = new SpotifyWebApi({
      clientId: config.SPOTIFY_CLIENT_ID,
      clientSecret: config.SPOTIFY_CLIENT_SECRET,
    });
    let data = await spotifyApi.clientCredentialsGrant();
    LoggerInstance.info(`✅ spotify token generated`);
    return { token: data.body['access_token'], expiresIn: data.body['expires_in'] };
  } catch (err) {
    LoggerInstance.error(err);
  }
};
