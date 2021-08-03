require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  /**
   * The id of the "SRMKZILLA bot admin" role
   */
  KZILLA_BOT_ADMIN_ID: process.env.KZILLA_BOT_ADMIN_ID,
  /**
   * SRMKZILLA's custom emoji for the music bot
   */
  KZILLA_CUSTOM_EMOJI: process.env.KZILLA_CUSTOM_EMOJI,
  /**
   * Music bot's name
   */
  DISCORD_BOT_NAME: process.env.DISCORD_BOT_NAME,
  /**
   * spotify client id and secret
   */
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  /**
   * KZILLA's guild ID and Custom emoji ID
   */
  KZILLA_GUILD_ID: process.env.KZILLA_GUILD_ID,
  /**
   *Prefix(s) to be used
   */
  PREFIX: process.env.PREFIX || '#octavia',
  PREFIX_2: process.env.PREFIX_2 || '#oc',
  /**
   * Database the app should connect to
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * the secret token of the bot
   */
  TOKEN: process.env.TOKEN,
  /**
   * Youtube's API's key
   */
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  /**
   * Genius lyrics' API key
   */
  GENIUS_API_KEY: process.env.GENIUS_API_KEY,
  /**
   * Used by Winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};
