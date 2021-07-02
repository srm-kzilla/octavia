import { StreamDispatcher, TextChannel, VoiceConnection } from 'discord.js';

export type Play = {
  connection: VoiceConnection;
  dispatcher?: StreamDispatcher;
  queue: Array<{title: string; url: string; originalTitle: string; artistName: string; timestamp: string }>;
  guildID: string;
  currentSong: number;
  loop: boolean;
  timer?: NodeJS.Timeout;
  memberCount: number;
  textChannel: TextChannel;
};

export type Queue={
    title: string;
    url: string;
    originalTitle: string;
    artistName: string;
    timestamp: string;
}