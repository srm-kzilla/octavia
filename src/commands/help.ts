import { Message } from 'discord.js';
import config from '../config';
import { COMMANDS, CONSTANT_URL, EMBED, MESSAGES } from '../shared/constants';

/**
 * Handles the "help" command and sends the "help" message.
 * @param {Message} message The incoming message
 */

export const helpCommandHandler = (message: Message) : void=> {
  message.channel.send(
    EMBED()
      .setThumbnail(CONSTANT_URL.JILL_THUMBNAIL)
      .setTitle(MESSAGES.HELP_TITLE)
      .setDescription(MESSAGES.HELP_DESCRIPTION)
      .addFields(
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.PLAY} <Song's name>` + '`',
          value: `Play your favourite songs! if you do not get the right song, try adding the artist's name. ⏯`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.PAUSE} ` + '`',
          value: `Someone wants to talk? Darn it. Not an issue, pause the music. 🤦‍♀️`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.RESUME} ` + '`',
          value: `Phew, resume the music and go back to the magical land of music. 💖`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.LYRICS} ` + '`',
          value: `Having trouble keeping up with Eminem's rap 🏃‍♂️ or Taylor's awesome lyrics? use this command to get the lyrics of the current song.`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.LYRICS_FIND} <song's name>, <artist's name> ` + '`',
          value: `Want to see the lyrics of a random song? well use this command and shock them at the karaoke night. 🎤`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.LEAVE}` + '`',
          value: `Tired of listening to music and want to get rid of me? Well, that is highly unlikely but if you still do... 💔`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.LOOP}` + '`',
          value: `Coding something or working on an assignment and want to listen to songs in loop? Well, I got you covered buddy. Alternatively, use the same command to turn the looping off! 🤹‍♀️`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.SHUFFLE}` + '`',
          value: `Want some spice in life? Well, shuffle you songs and break the monotony. 😮`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.SKIP}` + '`',
          value: `Ahhh, this song sucks. Skip it!`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.SKIP_TO} <song's index>` + '`',
          value: `Well, want to jump to another song? Use me! 😎`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.PREVIOUS}` + '`',
          value: `Some songs are so good that you want to go back and listen to again to absord the greatness, and I have got you covered! 😘`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.QUEUE}` + '`',
          value: `Want to see the songs in your queue? I got you coverend! Trying to figure out why "queue" isn't written as "q"? Let me know once you find the answer! 🕵️‍♂️🕵️‍♀️`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.QUEUE} <page number>` + '`',
          value: `Enter a page number and I'll fetch that for ya matie! 🏴‍☠️`,
        },
        {
          name: '`' + `${config.PREFIX} ${COMMANDS.CLEAR_QUEUE}` + '`',
          value: `Pheww, that person with the weird music taste just left. Clear the queue and start afresh! 🥰`,
        },
      ),
  );
};
