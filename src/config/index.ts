require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  /**
   * Database the app should connect to
   */
  EMBED_FOOTER: process.env.EMBED_FOOTER || 'by the SRMKZILLA team',
  /**
   * Database the app should connect to
   */
  THUMBNAIL: process.env.THUMBNAIL,
  /**
   * Database the app should connect to
   */
  PREFIX: process.env.PREFIX || '#kzjill',

  /**
   * Database the app should connect to
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * the secret token of the bot
   */
  TOKEN: process.env.TOKEN,

  /**
   * Used by Winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};
