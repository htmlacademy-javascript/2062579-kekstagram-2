import { getRandomNumber, createId } from './utils.js';
import { getDataArrays } from './data.js';

const LIKES_NUMBER = { // количество лайков от мин до макс
  MIN: 15,
  MAX: 200
};
const COMMENTS_NUMBER = { // количесвто генерируемых комментариев
  MIN: 0,
  MAX: 30
};
const AVATAR_NUMBER = { // номера генерируемых аватарок
  MIN: 1,
  MAX: 6
};
const PHOTOS_ID = { // идентификаторы фотографий по ТЗ от 1 до 25
  START: 1,
  END: 25
};

/* деструктурируем импортированные данные */
const { PHOTOS_DESCRIPTIONS, RAW_MESSAGES, NAMES } = getDataArrays();

/* функция генерации сообщения в комментарии */
const getMessage = (messagesArray) => {
  const message1 = messagesArray[getRandomNumber(0, messagesArray.length - 1)];
  const message2 = messagesArray[getRandomNumber(0, messagesArray.length - 1)];
  return message1 !== message2 ? `${message1} ${message2}` : message1;
};

/* функция генерации id комментария, первый id=1 */
const getIdComment = createId(1);

/* функция генерации массива комментариев */
const getCommentsArray = (names, messages) => {
  const comments = [];
  const commentsNumber = getRandomNumber(COMMENTS_NUMBER.MIN, COMMENTS_NUMBER.MAX);
  for (let i = 0; i < commentsNumber; i++) {
    const comment = {
      id: getIdComment(),
      avatar: `img/avatar-${getRandomNumber(AVATAR_NUMBER.MIN, AVATAR_NUMBER.MAX)}.svg`,
      message: getMessage(messages),
      name: names[getRandomNumber(0, names.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
};

/* функции генерации массива объектов с фотографиями */

const getIdPhoto = createId(PHOTOS_ID.START); // счетчик id для фотографий

const getPhotoDescription = () => { // функция формирования одного объекта описания фото
  const Id = getIdPhoto();
  const photo = {
    id: Id,
    url: `photos/${Id}.jpg`,
    description: PHOTOS_DESCRIPTIONS[Id - 1],
    likes: getRandomNumber(LIKES_NUMBER.MIN, LIKES_NUMBER.MAX),
    comments: getCommentsArray(NAMES, RAW_MESSAGES, Id)
  };
  return photo;
};

const createPhotosArray = () => Array.from({ length: PHOTOS_ID.END }, getPhotoDescription); // функция, формирующая массив описаний

export { createPhotosArray };
