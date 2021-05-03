import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, ERROR_MESSAGES, MESSAGES } from '../shared/constants';

export const queueCommandHandler = message => {
  if (userInVoiceChannelCheck(message)) {
    let arrayKeywords = message.content.trim().split(' ');
    if (arrayKeywords.length < 3) return message.channel.send(EMBED().setDescription(queueCurrentPage(message)));
    message.channel.send(EMBED().setDescription(queuePageHandler(message, arrayKeywords[2])));
  }
};

const queueCurrentPage = message => {
  let queueArray = connectionMap.get(message.guild.id).queue;
  if (!queueArray) return;
  if (queueArray.length < 12) return createFirstPage(queueArray, message);
  return createCurrentPage(queueArray, message);
};

const queuePageHandler = (message, pageNumber) => {
  let pageArray = splitArray(connectionMap.get(message.guild.id).queue);
  pageNumber = parseInt(pageNumber);
  if (isNaN(pageNumber)) return ERROR_MESSAGES.INVALID_PAGE_NUMBER;
  if (pageNumber > pageArray.length) return ERROR_MESSAGES.PAGE_DOES_NOT_EXIST;
  return createUserRequestedPage(pageArray, message, pageNumber);
};

const splitArray = queueArray => {
  let pageSize = 10,
    pageArray = [];
  for (let index = 0; index < queueArray.length; index += pageSize) {
    pageArray.push(queueArray.slice(index, index + pageSize));
  }
  return pageArray;
};

const createUserRequestedPage = (pageArray, message, pageNumber) => {
  let queueList = queueMessageHeader();
  pageArray[pageNumber - 1].forEach(element => {
    if (element.originalTitle.length > 30) element.originalTitle = element.originalTitle.substring(0, 30) + '...';
    queueList = queueList + generalSongInfo(element, connectionMap.get(message.guild.id).queue.indexOf(element));
  });
  return queueList;
};

const createFirstPage = (queueArray, message) => {
  let queueList = queueMessageHeader();
  queueArray.forEach((element, index) => {
    if (Math.abs(connectionMap.get(message.guild.id).currentSong - index) < 8) {
      if (index === connectionMap.get(message.guild.id).currentSong) {
        if (element.originalTitle.length > 30) element.originalTitle = element.originalTitle.substring(0, 30) + '...';
        queueList = queueList + currentSongInfo(element);
      } else queueList = queueList + generalSongInfo(element, index);
    }
  });
  return queueList;
};

const createCurrentPage = (queueArray, message) => {
  let queueList = queueMessageHeader();
  queueArray.forEach((element, index) => {
    if (element.originalTitle.lenth > 30) element.originalTitle = element.originalTitle.substring(0, 30) + '...';
    if (Math.abs(connectionMap.get(message.guild.id).currentSong - index) < 8) {
      if (index === connectionMap.get(message.guild.id).currentSong) queueList = queueList + currentSongInfo(element);
      else queueList = queueList + generalSongInfo(element, index);
    }
  });
  return queueList;
};

const currentSongInfo = element => {
  return `\u3000🎶🎶\u3000\u3000\u3000**[${element.timestamp}]**\u3000\u3000\u3000**[${element.originalTitle}](${element.url})**\n`;
};

const generalSongInfo = (element, index) => {
  return `\u3000\u3000**${index + 1}**\u3000\u3000\u3000\u3000**[${element.timestamp}]**\u3000\u3000\u3000**[${
    element.originalTitle
  }](${element.url})**\n`;
};

const queueMessageHeader = () => {
  return `\u3000**${MESSAGES.QUEUE_MESSAGE.index}**\u3000**${MESSAGES.QUEUE_MESSAGE.length}**\u3000**${MESSAGES.QUEUE_MESSAGE.song_name}**\n`;
};
