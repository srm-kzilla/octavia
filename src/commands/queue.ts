import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED, MESSAGES } from '../shared/constants';

export const queueCommandHandler = message => {
  if (userInVoiceChannelCheck(message)) {
    let arrayKeywords = message.content.trim().split(' ');
    if (arrayKeywords.length < 3) return message.channel.send(EMBED().setDescription(queueCurrentPage(message)));
    message.channel.send(EMBED().setDescription(queuePageHandler(message, arrayKeywords[2])));
  }
};

const queueCurrentPage = message => {
  //5//25
  let queueList = `\u3000**${MESSAGES.QUEUE_MESSAGE.index}**\u3000**${MESSAGES.QUEUE_MESSAGE.length}**\u3000**${MESSAGES.QUEUE_MESSAGE.song_name}**\n`;
  let queueArray = connectionMap.get(message.guild.id).queue;
  if (!queueArray) return;
  if (queueArray.length < 12) {
    queueArray.forEach((element, index) => {
      index;
      if (Math.abs(connectionMap.get(message.guild.id).currentSong - index) < 8) {
        if (index === connectionMap.get(message.guild.id).currentSong) {
          if (element.originalTitle.length > 20) element.originalTitle = element.originalTitle.substring(0, 20) + '...';
          queueList =
            queueList +
            `🎶\u3000${index + 1}\u3000\u3000\u3000\u3000[${
              element.timestamp
            }]\u3000\u3000[${element.originalTitle.concat('')}](${element.url})\u3000🎶 [The current song!]\n`;
        } else
          queueList =
            queueList +
            `\u3000\u3000**${index + 1}**\u3000\u3000\u3000\u3000**[${element.timestamp}]**\u3000\u3000**[${
              element.originalTitle
            }](${element.url})**\n`;
      }
    });
    return queueList;
  }
  queueArray.forEach((element, index) => {
    if (Math.abs(connectionMap.get(message.guild.id).currentSong - index) < 8) {
      if (index === connectionMap.get(message.guild.id).currentSong)
        queueList =
          queueList + `🎶>>>>>>>[${element.timestamp}] [${element.originalTitle}](${element.url}) <<<<<<<🎶\n`;
      else
        queueList =
          queueList +
          `\u3000\u3000**${index + 1}**\u3000\u3000\u3000\u3000**[${element.timestamp}]**\u3000\u3000**[${
            element.originalTitle
          }](${element.url})**\n`;
    }
  });
  return queueList;
};

const queuePageHandler = (message, pageNumber) => {
  let pageArray = splitArray(connectionMap.get(message.guild.id).queue);
  pageNumber = parseInt(pageNumber);
  if (isNaN(pageNumber)) return 'Not a valid pageNumber';
  if (pageNumber > pageArray.length) return 'Page does not exist!';
  let queueList = `\u3000**${MESSAGES.QUEUE_MESSAGE.index}**\u3000**${MESSAGES.QUEUE_MESSAGE.length}**\u3000**${MESSAGES.QUEUE_MESSAGE.song_name}**\n`;
  pageArray[pageNumber - 1].forEach((element, index) => {
    queueList =
      queueList +
      `\u3000\u3000**${connectionMap.get(message.guild.id).queue.indexOf(element) + 1}**\u3000\u3000\u3000\u3000**[${
        element.timestamp
      }]**\u3000\u3000**[${element.originalTitle}](${element.url})**\n`;
  });
  return queueList;
};

const splitArray = queueArray => {
  let pageSize = 10,
    pageArray = [];
  for (let index = 0; index < queueArray.length; index += pageSize) {
    pageArray.push(queueArray.slice(index, index + pageSize));
  }
  return pageArray;
};
