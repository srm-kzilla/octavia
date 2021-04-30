import { connectionMap } from '../controller';
import { userInVoiceChannelCheck } from '../shared/auth';
import { EMBED } from '../shared/constants';

export const queueCommandHandler = message => {
  if (userInVoiceChannelCheck(message)) {
    let arrayKeywords = message.content.trim().split(' ');
    if (arrayKeywords.length < 3) return message.channel.send(EMBED().setDescription(queueCurrentPage(message)));
    message.channel.send(EMBED().setDescription(queuePageHandler(message, arrayKeywords[2])));
    // if (queueArray) {
    //   if (queueArray.length < 12) {
    //     for (let i = 0; i < queueArray.length; i++) {
    //       if (i === connectionMap.get(message.guild.id).currentSong)
    //         queueList =
    //           queueList +
    //           `**current song**=> [${queueArray[i].originalTitle}](${queueArray[i].url})       [${queueArray[i].timestamp}]\n`;
    //       else
    //         queueList =
    //           queueList +
    //           `**${i + 1}**=> [${queueArray[i].originalTitle}](${queueArray[i].url})      [${
    //             queueArray[i].timestamp
    //           }]\n`;
    //     }
    //   } else {
    //     for (let i = 0; i < queueArray.length; i++) {
    //       if (Math.abs(connectionMap.get(message.guild.id).currentSong - i) < 8) {
    //         if (i === connectionMap.get(message.guild.id).currentSong)
    //           queueList =
    //             queueList +
    //             `**current song**=> [${queueArray[i].originalTitle}](${queueArray[i].url})      [${queueArray[i].timestamp}]\n`;
    //         else
    //           queueList =
    //             queueList +
    //             `**${i + 1}**=> [${queueArray[i].originalTitle}](${queueArray[i].url})      [${
    //               queueArray[i].timestamp
    //             }] \n`;
    //       }
    //     }
    //   }
    //   message.channel.send(EMBED().setDescription(queueList).setTitle('You song queue:'));
    // }
  }
};

const queueCurrentPage = message => {
  let queueList = ``;
  let queueArray = connectionMap.get(message.guild.id).queue;
  if (!queueArray) return;
  if (queueArray.length < 12) {
    queueArray.forEach((element, index) => {
      index;
      if (Math.abs(connectionMap.get(message.guild.id).currentSong - index) < 8) {
        if (index === connectionMap.get(message.guild.id).currentSong)
          queueList =
            queueList + `**current song**=> [${element.originalTitle}](${element.url})      [${element.timestamp}]\n`;
        else
          queueList =
            queueList + `**${index + 1}**=> [${element.originalTitle}](${element.url})      [${element.timestamp}] \n`;
      }
    });
    return queueList;
  }
  queueArray.forEach((element, index) => {
    if (Math.abs(connectionMap.get(message.guild.id).currentSong - index) < 8) {
      if (index === connectionMap.get(message.guild.id).currentSong)
        queueList =
          queueList + `**current song**=> [${element.originalTitle}](${element.url})      [${element.timestamp}]\n`;
      else
        queueList =
          queueList + `**${index + 1}**=> [${element.originalTitle}](${element.url})      [${element.timestamp}] \n`;
    }
  });
  return queueList;
};

const queuePageHandler = (message, pageNumber) => {
  let pageArray = splitArray(connectionMap.get(message.guild.id).queue);
  pageNumber = parseInt(pageNumber);
  if (isNaN(pageNumber)) return 'Not a valid pageNumber';
  if (pageNumber > pageArray.length) return 'Page does not exist!';
  let queueList = ``;
  pageArray[pageNumber - 1].forEach((element, index) => {
    queueList =
      queueList +
      `**${connectionMap.get(message.guild.id).queue.indexOf(element) + 1}** => [${element.originalTitle}](${
        element.url
      })      [${element.timestamp}] \n`;
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
