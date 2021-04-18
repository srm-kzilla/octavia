import { StreamDispatcher, VoiceConnection } from 'discord.js';

export type Play = {
  connection: VoiceConnection;
  dispatcher?: StreamDispatcher;
  queue: Array<{ title: string; url: string }>;
  guildID: string;
  currentSong: number;
  loop: boolean;
};
