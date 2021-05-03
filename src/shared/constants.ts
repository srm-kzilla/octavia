import { MessageEmbed } from 'discord.js';
import config from '../config';

export const EMBED = () => {
  return new MessageEmbed().setTimestamp().setFooter(config.EMBED_FOOTER).setColor(COLOR_CODES.DEFAULT);
};

export const COLOR_CODES = {
  WRONG_COMMAND_COLOR_CODE: '#ff0000',
  DEFAULT: '#00ccff',
  LEAVE: '#ff1a75',
  PLAYING: '#1aff1a',
  PLAYLIST_ADDED: '#ff66cc',
  SONG_FINISHED_PLAYING: '#ff4000',
  LOOP_OFF: '#6600cc',
  LOOP_ON: '#00cc99',
  PAUSE: '#e60000',
  RESUME: ' #00ff00',
  CLEAR: '#ff5500',
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
  LYRICS_FIND: 'findlyrics',
  CLEAR_QUEUE: 'clear',
  NEXT: 'next',
};
export const ERROR_MESSAGES = {
  UNKNOWN_ERROR: [
    `An error occured with me. I'd tell you but then I'd have to kill you.`,
    `Uh Oh, someone forgot to pay the server bills and now I can't function properly.`,
    `I was busy helping jack so I was not able to play your song. Please try again? `,
  ],
  DEFAULT_TITLE: `Oops!`,
  DEFAULT_DESCRIPTION: `Wrong command. try: **${config.PREFIX} ${COMMANDS.HELP}** to see a list of valid commands 📃`,
  USER_NOT_IN_A_VOICE_CHANNEL: `Oops, it seems like you are not in a voice channel. Please join one.`,
  BOT_NOT_IN_A_VOICE_CHANNEL: 'ummm... I am not in a voice channel.',
  USER_NOT_IN_THE_SAME_CHANNEL: 'You need to be in the same channel as that of me to use my services! 🙋‍♀️',
  NO_SONG_URL_OR_KEYWORD: `Please enter a link or a song name! 🧐`,
  UNABLE_TO_FIND_A_MATCH: `Sorry, I couldn't find the song. 😥`,
  UNABLE_TO_SKIP: 'cannot skip, queue empty. Add songs and then then try skipping.',
  UNABLE_TO_FIND_PLAYLIST: 'Hi, I was unable to find the playlist, please check and try again. 😞',
  UNABLE_TO_FIND_LYRICS: `Oooops! I was unable to find the lyrics. 😭 \nUse **${config.PREFIX} ${COMMANDS.LYRICS_FIND} song name, artist's name** to get the lyrics of any song!`,
  INCORRECT_SYNTAX: `Ooppss! You have used the wrong syntax. Use **${config.PREFIX} ${COMMANDS.HELP}** to see the proper syntax. ☺`,
  QUEUE_EMPTY: 'Oooopsss! The queue is empty, please add some songs and then try shuffling them! 😅',
  ERROR_PlAYING_SONG:
    'Oopsss! Something went wrong. Please add the current song again while I play the next song in the queue.',
};

export const MESSAGES = {
  PLAYLIST_ADDED: 'Your playlist has been added to the queue! 🎶',
  HELP_TITLE: '',
  HELP_DESCRIPTION: '',
  LEAVE_CHANNEL: 'I have left the voice channel on your Command! 💔',
  SONG_OVER: 'Finished playing: ',
  SONG_START: '💃🕺Now playing : ',
  LOOP_ON: 'Loop on! ➿',
  LOOP_OFF: 'Loop off! ➰',
  MUSIC_PAUSE: '🎶 Music paused! ⏸',
  MUSIC_RESUME: '🎶 Music resumed! ▶',
  LEAVE: {
    TITLE: 'Leaving the channel!',
    DESCRIPTION: `Hi, I am leaving 😔 the channel due to inactivity, but do not fret, you can play music again! 🙌\n\nUse **${config.PREFIX} ${COMMANDS.HELP}** to see the list of my commands. 📖`,
  },
  CANNOT_PLAY_PREVIOUS_SONG: 'There are no songs before the current song in the queue.',
  USE_FIND_LYRICS_COMMANDS: `Unsatisfied with the lyrics? Use **${config.PREFIX} ${COMMANDS.LYRICS_FIND} <song name>, <artist's name>** to get the lyrics of any song!`,
  FETCHING_LYRICS: [
    `Please wait while I fetch those lyrics for you...`,
    `Keep humming the wrong lyrics while I fetch the correct ones!`,
    `Please wait while I find the key to open the box which has the lyrics you need.`,
  ],
  SPOTIFY_URL_PLAYING: `Wooohooo! 🎊 I have successfully added the song(s) in the spotify URL to your queue! 🎼`,
  FINISHED_PLAYING: '🏁Finished playing:',
  SHUFFLE_MUSIC: '👀 I have shuffled the music in your queue! 🔀',
  CLEAR_QUEUE: 'I have cleared the queue for you! 🧹',
  LEAVE_EMPTY: 'Since the channel is empty, I will be leaving it in a few seconds unless you join! 🙋‍♀️🙋‍♂️',
};

export const REGEX = {
  YOUTUBE_REGEX: `^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+`,
  SPOTIFY_REGEX: `^((spotify:)(track|playlist|album):.+)|(http(s)?:\/\/)?(open.)(spotify)(\.com)\/(track|playlist|album)\/.+`,
  SPOTIFY_WEB_URL_REGEX: `(http(s)?:\/\/)?(open.)(spotify)(\.com)\/(track|playlist|album)\/.+`,
  SPOTIFY_URL_REGEX: `^((spotify:)(track|playlist|album):.+)`,
};

export const EMOJIS = {
  REACTION_DEFAULT_CASE: '❌',
  REACTION_CORRECT_COMMAND: '🎵',
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
