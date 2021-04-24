import nodecache from 'node-cache';
import LoggerInstance from './logger';
import { spotifyGetToken } from './spotify';

let cache: nodecache;
const initCache = async () => {
  try {
    cache = new nodecache();
    LoggerInstance.info(`✅ cache initialized`);
    return cache;
  } catch (err) {
    throw err;
  }
};

const setSpotifyToken = async () => {
  try {
    if (!cache) await initCache();
    let tokenData = await spotifyGetToken();
    await cache.set('spotify', tokenData.token, tokenData.expiresIn);
    LoggerInstance.info(`✅ token set in cache. Expires in: ${tokenData.expiresIn}`);
  } catch (err) {
    throw err;
  }
};
export const getSpotifyToken = async () => {
  try {
    if (!cache) await initCache();
    if (!cache.get('spotify')) {
      await setSpotifyToken();
    }
    return cache.get('spotify');
  } catch (err) {
    LoggerInstance.error(err.message);
  }
};
