import { Message } from 'discord.js';
import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES, MESSAGES } from '../shared/constants';
import { Play, Queue } from '../shared/customTypes';

/**
 * Handles the "queue" command by either showing the current song page or the desired page of the queue(send an error message if the queue page does not exist).
 * @param {Message} message 
 * @returns {Promise<Message>} Returns a message after sending the queue or an appropriate error message
 */

export const queueCommandHandler = (message:Message) :Promise<Message>=> {
  if (userInVoiceChannelCheck(message)) {
    let arrayKeywords = message.content.trim().split(/[ ]+/);
    if (arrayKeywords.length < 3) return message.channel.send(EMBED().setDescription(queueCurrentPage(message)));
    message.channel.send(EMBED().setDescription(queuePageHandler(message, arrayKeywords[2])));
  }
};

/**
 *  Fetches the entire queue from the connectionMap
 * @param {Message} message The incoming message 
 * @returns {string} Returns the formatted queue
 */

const queueCurrentPage = (message:Message):string => {
  let queueArray =  (connectionMap.get(message.guild.id) as Play).queue;
  if (!queueArray) return;
  if (queueArray.length < 12) return createFirstPage(queueArray, message);
  return createCurrentPage(queueArray, message);
};

/**
 * Checks if the page number exists or not and then returns an appropriate message or the actual queue.
 * @param {Message}message The incoming message
 * @param {string|number} pageNumber Page number of the queue to be fetched
 * @returns {string} Returns either the message string or an error message
 */

const queuePageHandler = ( message: Message, pageNumber:string|number) : string=> {
  let pageArray = splitArray(    (connectionMap.get(message.guild.id) as Play).queue);
  pageNumber = parseInt(pageNumber as string);
  if (isNaN(pageNumber)) return ERROR_MESSAGES.INVALID_PAGE_NUMBER;
  if (pageNumber > pageArray.length) return ERROR_MESSAGES.PAGE_DOES_NOT_EXIST;
  return createUserRequestedPage( pageArray, message, pageNumber );
  
};

/**
 * Slices the entire queue array into mutliple arrays of size 10 each
 * @param {Array<Queue>} queueArray  An array of songs in the queue
 * @returns {Array<Array<Queue>>} Returns an array of queue pages
 */

const splitArray = (queueArray:Array<Queue>):Array<Array<Queue>>=> {
  let pageSize = 10,
    pageArray:Array<Array<Queue>>=[];
  for (let index = 0; index < queueArray.length; index += pageSize) {
    pageArray.push(queueArray.slice(index, index + pageSize));
  }
  return pageArray;
};

/**
 * Create the queue message for the page user requested
 * @param {Array<Array<Queue>>} pageArray The array of queue pages
 * @param {Message} message The incoming message
 * @param {Number} pageNumber The page number of the queue
 * @returns {string} Returns the entire queue page
 */

const createUserRequestedPage = (pageArray:Array<Array<Queue>>, message:Message, pageNumber:number):string => {
  let queueList = queueMessageHeader();
  pageArray[pageNumber - 1].forEach(element => {
    if (element.originalTitle.length > 30) element.originalTitle = element.originalTitle.substring(0, 30) + '...';
    queueList = queueList + generalSongInfo(element,(connectionMap.get(message.guild.id) as Play).queue.indexOf(element));
  });
  return queueList;
};

/**
 * Creates the first page of the queue
 * @param {<Array<Queue>>} queueArray An array of song information
 * @param {Message} message The incoming message
 * @returns {string} Returns the entire templated page
 */

const createFirstPage = (queueArray:Array<Queue>, message:Message):string => {
  let queueList = queueMessageHeader();
  queueArray.forEach((element, index) => {
    if (Math.abs((connectionMap.get(message.guild.id) as Play).currentSong - index) < 8) {
      if (index ===(connectionMap.get(message.guild.id) as Play) .currentSong) {
        if (element.originalTitle.length > 30) element.originalTitle = element.originalTitle.substring(0, 30) + '...';
        queueList = queueList + currentSongInfo(element);
      } else queueList = queueList + generalSongInfo(element, index);
    }
  });
  return queueList;
};

/**
 * Creates the queue message body for the current page
 * @param {Array<Queue>} queueArray An array of song information
 * @param {Message} message The incoming message 
 * @returns {string} Returns the templated current page queue list
 */

const createCurrentPage = (queueArray:Array<Queue>, message:Message):string => {
  let queueList = queueMessageHeader();
  queueArray.forEach((element, index) => {
    if (element.originalTitle.length > 30) element.originalTitle = element.originalTitle.substring(0, 30) + '...';
    if (Math.abs(    (connectionMap.get(message.guild.id) as Play).currentSong - index) < 8) {
      if (index ===    (    (connectionMap.get(message.guild.id) as Play) as Play).currentSong) queueList = queueList + currentSongInfo(element);
      else queueList = queueList + generalSongInfo(element, index);
    }
  });
  return queueList;
};

/**
 * Templates the current song and returns the string.
 * @param {Queue} element The raw song information
 * @returns {string} Returns templated information about the song
 */

const currentSongInfo = (element:Queue) => {
  return `\u3000🎶🎶\u3000\u3000\u3000**[${element.timestamp}]**\u3000\u3000\u3000**[${element.originalTitle}](${element.url})**\n`;
};

/**
 * Returns the templated information about the song
 * @param {Queue} element The raw song information
 * @param {number}index The index of the song in the queue
 * @returns {string} Returns templated information about the song
 */

const generalSongInfo = (element:Queue, index:number) => {
  return `\u3000\u3000**${index + 1}**\u3000\u3000\u3000\u3000**[${element.timestamp}]**\u3000\u3000\u3000**[${
    element.originalTitle
  }](${element.url})**\n`;
};

/**
 * Builds the header for the queue message sent to the user
 * @returns {string} Returns the header 
 */

const queueMessageHeader = () => {
  return `\u3000**${MESSAGES.QUEUE_MESSAGE.index}**\u3000**${MESSAGES.QUEUE_MESSAGE.length}**\u3000**${MESSAGES.QUEUE_MESSAGE.song_name}**\n`;
};
