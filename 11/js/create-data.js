// модуль генерирует случайные данные, можно удалить
import {getRandomNumber} from './utilities.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION_PHOTOS = [
  'Вид на залив сверху',
  'Указатель пути на пляж',
  'Берег моря и камни',
  'Красотка с фотоаппаратом',
  'Еда в ресторане',
  'Спортивная машина',
  'На диете :(',
  'Свежий сок!',
  'Самолет над пляжем',
  'Оригинальный интерьер',
  'Облака над заборчиками',
  'Аудос',
  'И снова еда!',
  'Кот недоволен',
  'Мегаваленки',
  'Над горами',
  'На концерте',
  'Старинная тачка',
  'Тапки с фонариками',
  'Пальмы, вечер, облака',
  'Еще еда',
  'Закат в заливе',
  'Краб',
  'Снова концерт',
  'Бегемоты и Лэндровер',
];

const NAMES = [
  'Артём',
  'Александр',
  'Саша',
  'Лёша',
  'Алексей',
  'Андрей',
  'Анатолий',
  'Толя',
  'Анна',
  'Аня',
  'Алина',
  'Александра',
  'Борис',
  'Вова',
  'Владимир',
  'Виктор',
  'Витя',
  'Виктория',
  'Вика',
  'Валерий',
  'Валера',
  'Валерия',
  'Георгий',
  'Гоша',
  'Жора',
  'Геннадий',
  'Гена',
  'Галина',
  'Галя',
  'Дмитрий',
  'Митя',
  'Дима',
  'Денис',
  'Данила',
  'Даниил',
  'Дарья',
  'Даша',
  'Евгений',
  'Евгения',
  'Женя',
  'Елисей',
  'Егор',
  'Екатерина',
  'Катерина',
  'Катя',
  'Зиновий',
  'Зинаида',
  'Зина',
  'Игорь',
  'Ирина',
  'Ира',
  'Инна',
  'Иннокентий',
  'Константин',
  'Костя',
  'Кирилл',
  'Ксения',
  'Ксюша',
  'Леонид',
  'Лёня',
  'Лев',
  'Михаил',
  'Миша',
  'Максим',
  'Макс',
  'Мария',
  'Маша',
  'Марина',
  'Николай',
  'Коля',
  'Нина',
  'Олег',
  'Ольга',
  'Оля',
  'Оксана',
  'Павел',
  'Паша',
  'Пётр',
  'Петя',
  'Руслан',
  'Роман',
  'Рома',
  'Сергей',
  'Серёга',
  'Семён',
  'Сёма',
  'Станислав',
  'Стас',
  'Тимофей',
  'Тёма',
  'Татьяна',
  'Таня',
  'Фёдор',
  'Федя',
  'Феликс',
  'Эдуард',
  'Эдик',
  'Элина',
  'Юрий',
  'Юра',
  'Юлия',
  'Юля',
  'Яков',
  'Яна',
];

/* количество генерируемых описаний */
const QUANTITY_PHOTOS = 25;

/* минимальное и максимальное количество комментариев */
const MIN_COMMENTS_QUANTITY = 0;
const MAX_COMMENTS_QUANTITY = 30;

/* минимальное и максимальное количество лайков */
const MIN_LIKES_QUANTITY = 15;
const MAX_LIKES_QUANTITY = 200;

/* минимальное и максимальное количество аватарок */
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

/*функция создания текста комментария*/
const createRandomMessage = () => {
  let randomMessage;
  /* рандомно выбираем два сообщения из массива */
  const randomMessage1 = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
  const randomMessage2 = MESSAGES[getRandomNumber(0, MESSAGES.length - 1)];
  /*сравниваем их*/
  if (randomMessage1 === randomMessage2) {
    randomMessage = randomMessage1; /* если одинаковые, выбираем первый*/
  } else {
    randomMessage = `${randomMessage1} ${randomMessage2}`;
  }
  return randomMessage;
};

/* функция генерации адреса аватара */
const getAvatar = () => `img/avatar-${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`;

/* функция генерации массива комментариев*/
const createCommentsArray = (id, commentsQuantity) => {
  if (commentsQuantity > 0) {
    /* коэффициент для создания id комментариев*/
    const idFactor = 10000;
    /* функция создания одного комментария */
    const createComment = (_, index) => {
      const idPhoto = id;
      return {
        id: idPhoto * idFactor + (index + 1), // id комментария состоит из id фото и порядкового номера комментария
        avatar: getAvatar(),
        message: createRandomMessage(),
        name: NAMES[getRandomNumber(0, NAMES.length - 1)],
      };
    };
    /*создаем массив с комментариями к фото*/
    return Array.from({length: commentsQuantity}, createComment);
  }
};

/*функция создания описания фото*/
const createPhotoDescription = (_, index) => {
  /* определение количества комментариев */
  const commentsQuantity = getRandomNumber(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTION_PHOTOS[index],
    likes: getRandomNumber(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY),
    comments: createCommentsArray(index + 1, commentsQuantity),
  };
};

/*создаем и заполняем массив с описаниями фото*/
const createDescriptionsArray = () => Array.from({length: QUANTITY_PHOTOS}, createPhotoDescription);

export {createDescriptionsArray};
