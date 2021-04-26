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
  LEAVE: '#ff1a75',
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
  PREVIOUS: 'previous',
  LYRICS: 'lyrics',
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
  UNABLE_TO_SKIP: 'cannot skip, queue empty. Add songs and then then try skipping.',
  UNABLE_TO_FIND_PLAYLIST: 'Hi, I was unable to find the playlist, please check and try again.',
  UNABLE_TO_FIND_LYRICS: 'Oooops! I was unable to find the lyrics. 😭',
};

export const MESSAGES = {
  PLAYLIST_ADDED: 'Your playlist has been added to the queue!',
  HELP_TITLE: '',
  HELP_DESCRIPTION: '',
  LEAVE_CHANNEL: 'I have left the voice channel!',
  SONG_OVER: 'Finished playing: ',
  SONG_START: 'Now playing : ',
  LOOP_ON: 'Loop on! ➿',
  LOOP_OFF: 'Loop off!',
  MUSIC_PAUSE: 'Music pause!⏸',
  MUSIC_RESUME: 'Music resume!▶',
  LEAVE: {
    TITLE: 'Leaving the channel!',
    DESCRIPTION: `Hi, I am leaving the channel due to inactivity, but do not fret, you can play music again! Use ${config.PREFIX} ${COMMANDS.HELP} to see the list of my commands.`,
  },
  CANNOT_PLAY_PREVIOUS_SONG: 'There are no songs before the current song in the queue.',
};

export const REGEX = {
  YOUTUBE_REGEX: `^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+`,
  SPOTIFY_REGEX: `^((spotify:)(track|playlist|album):.+)|(http(s)?:\/\/)?(open.)(spotify)(\.com)\/(track|playlist|album)\/.+`,
  SPOTIFY_WEB_URL_REGEX: `(http(s)?:\/\/)?(open.)(spotify)(\.com)\/(track|playlist|album)\/.+`,
  SPOTIFY_URL_REGEX: `^((spotify:)(track|playlist|album):.+)`,
};

export const EMOJIS = {
  REACTION_DEFAULT: '🔥',
};

export const CONSTANT_URL = {
  SPOTIFY_TOKEN: `https://accounts.spotify.com/api/token`,
  YOUTUBE_API: (listID, nextPageToken) => {
    if (!nextPageToken)
      return `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C%20snippet&maxResults=50&playlistId=${listID}&key=${config.YOUTUBE_API_KEY}`;
    return `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C%20snippet&maxResults=50&playlistId=${listID}&key=${config.YOUTUBE_API_KEY}&pageToken=${nextPageToken}`;
  },
  SONG_URL: videoID => {
    return `https://www.youtube.com/watch?v=${videoID}`;
  },
  SPOTIFY_TRACK_API: id => {
    return `https://api.spotify.com/v1/tracks/${id}`;
  },
  SPOTIFY_ALBUM_API: (id, next) => {
    if (!next) return `https://api.spotify.com/v1/albums/${id}/tracks?limit=50`;
    else return next;
  },
  SPOTIFY_PLAYLIST_API: (id, next) => {
    if (!next) return `https://api.spotify.com/v1/playlists/${id}/tracks`;
    return next;
  },
};
