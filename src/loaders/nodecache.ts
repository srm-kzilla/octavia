import nodecache from 'node-cache';
import LoggerInstance from './logger';
import { spotifyGetToken } from './spotify';

let cache: nodecache;

/**
 * Return a node cache instance
 * @returns {Promise<nodecache>}
 */
const initCache = async (): Promise<nodecache> => {
  try {
    cache = new nodecache();
    LoggerInstance.info(`✅ cache initialized`);
    return cache;
  } catch (err) {
    throw err;
  }
};

/**
 * Set token in node cache
 */
const setSpotifyToken = async (): Promise<void> => {
  try {
    if (!cache) await initCache();
    let tokenData = await spotifyGetToken();
    await cache.set('spotify', tokenData.token, tokenData.expiresIn);
    LoggerInstance.info(`✅ token set in cache. Expires in: ${tokenData.expiresIn}`);
  } catch (err) {
    throw err;
  }
};

/**
 * Return Spotify token from cache
 * @returns {Promise<string>} Spotify token
 */
export const getSpotifyToken = async (): Promise<string> => {
  try {
    if (!cache) await initCache();
    if (!cache.get('spotify')) {
      await setSpotifyToken();
    }
    return cache.get('spotify') as string;
  } catch (err) {
    LoggerInstance.error(err.message);
  }
};
