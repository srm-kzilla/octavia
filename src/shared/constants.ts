import { MessageEmbed } from 'discord.js';
import config from '../config';

export const EMBED = () => {
  return new MessageEmbed()
    .setTimestamp()
    .setFooter(config.EMBED_FOOTER)
    .setThumbnail(config.THUMBNAIL)
    .setColor(COLOR_CODES.DEFAULT);
};

export const COLOR_CODES = {
  WRONG_COMMAND_COLOR_CODE: '#ff0000',
  HELP_COLOR_CODE: '#0066ff',
  DEFAULT: '#008080',
};

export const randomNumber = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};
export const COMMANDS = {
  HELP: 'help',
  PLAY: 'play',
  LEAVE: 'leave',
  QUEUE: 'queue',
  SKIP: 'skip',
  PAUSE: 'pause',
  RESUME: 'resume',
  LOOP: 'loop',
  SHUFFLE: 'shuffle',
};
export const ERROR_MESSAGES = {
  UNKNOWN_ERROR: [
    `An error occured with me. I'd tell you but then I'sd have to kill you.`,
    `Uh Oh, someone forgot to pay the server bills and now I can't function properly.`,
  ],
  DEFAULT_TITLE: `Oops!`,
  DEFAULT_DESCRIPTION: `Wrong command. try: **${config.PREFIX} ${COMMANDS.HELP}** to see a list of valid commands`,
  USER_NOT_IN_A_VOICE_CHANNEL: `Oops, it seems like you are not in a voice channel. Please join one.`,
  BOT_NOT_IN_A_VOICE_CHANNEL: 'ummm... I am not in a voice channel.',
  USER_NOT_IN_THE_SAME_CHANNEL: 'You need to be in the same channel as that of me to use my services!',
  NO_SONG_URL_OR_KEYWORD: `Please enter a link or a song name!`,
  UNABLE_TO_FIND_A_MATCH: `Sorry, I couldn't find the song.`,
};

export const MESSAGES = {
  HELP_TITLE: '',
  HELP_DESCRIPTION: '',
  LEAVE_CHANNEL: 'I have left the voice channel!',
  SONG_OVER: 'Finished playing: ',
  SONG_START: 'Now playing : ',
  LOOP_ON: 'Loop on! ➿',
  LOOP_OFF: 'Loop off!',
  MUSIC_PAUSE: 'Music pause!⏸',
  MUSIC_RESUME: 'Music resume!▶',
};

export const REGEX = {
  YOUTUBE_REGEX: `^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+`,
};

export const EMOJIS = {
  REACTION_DEFAULT: '🔥',
};
