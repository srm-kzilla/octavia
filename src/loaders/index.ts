import database from './database';
import discord from './discord';
import Logger from './logger';
import { getSpotifyToken } from './nodecache';

export default async (): Promise<void> => {
  await database();
  Logger.info(`✅ Connection to database successful`);
  await discord();
  Logger.info(`✅ Connection to discord successful`);
  await getSpotifyToken();
  Logger.info('✅ All modules loaded!');
};
