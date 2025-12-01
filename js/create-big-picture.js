import { photosArray } from './interaction-server.js'; // импорт данных с сервера

const body = document.querySelector('body');
const NUMBER_OPEN_COMMENTS = 5; // сколько комментариев показываем за один раз
const bigPicture = document.querySelector('.big-picture'); // блок большого фото
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel'); // крестик на большом фото
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // изображение большого фото
const socialCaption = bigPicture.querySelector('.social__caption'); // описание фото
const socialCommentsTotal = bigPicture.querySelector('.social__comment-total-count'); // кол-во комментариев
const likesCount = bigPicture.querySelector('.likes-count'); // кол-во лайков
const socialComments = bigPicture.querySelector('.social__comments'); // блок с комментариями
const socialCommentsCollection = socialComments.children; // все комментарии к фото
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count'); // количество показанных комм-в
const commentsLoader = bigPicture.querySelector('.comments-loader'); // кнопка загрузки комм-в
const socialCommentsTemplate = bigPicture.querySelector('.social__comment'); // комментарий в разметке
// const socialCommentsFragment = document.createDocumentFragment(); // фрагмент для комментариев

// const createCommentsListItem = (comment) => { // функция создания комментария
//   const commentListItem = socialCommentsTemplate.cloneNode(true);
//   commentListItem.classList.add('hidden');

//   const commentText = commentListItem.querySelector('.social__text');
//   commentText.textContent = comment.message;

//   const commentAvatar = commentListItem.querySelector('.social__picture');
//   commentAvatar.src = comment.avatar;
//   commentAvatar.alt = comment.name;

//   socialCommentsFragment.append(commentListItem);
// };

const createCommentsListItem2 = (comment) => { // функция создания комментария
  // const socialCommentsFragment = document.createDocumentFragment(); // фрагмент для комментариев
  const commentListItem = socialCommentsTemplate.cloneNode(true);
  // commentListItem.classList.add('hidden');

  const commentText = commentListItem.querySelector('.social__text');
  commentText.textContent = comment.message;

  const commentAvatar = commentListItem.querySelector('.social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;

  // return socialCommentsFragment.append(commentListItem);
  return commentListItem;
};

// const countOpenComments = (i) => { // функция отображения кол-ва показанных комм-в
//   socialCommentShownCount.textContent = i + 1;
// };

// const hiddenCommentLoaderButton = (array, i) => { // функция, скрыающая кнопку-загрузчик комментариев при загрузке последнего комментария
//   if (i === array.length - 1) {
//     commentsLoader.classList.add('hidden'); // скрыть кнопку
//     commentsLoader.removeEventListener('click', manageComments2); // снять обработчик с кнопки
//   }
// };

// const openComments = (array, i) => { // функция, открывающая комментарии
//   if (array[i]) { // проверяем, что такой элемент существует и удаляем с него класс 'hidden'
//     array[i].classList.remove('hidden');
//   }
// };

/* функция управления блоком комментариев */
// function manageComments () {
//   const workArray = Array.from(socialCommentsCollection); // превращаем коллекцию в массив
//   const startElement = workArray.findIndex((elem) => // находим, какой первый элемент с классом 'hidden'
//     elem.classList.contains('hidden')
//   );
//   if (workArray.length === 0) {
//     commentsLoader.classList.add('hidden'); // скрыть кнопку-загрузчик, если нет комментариев
//   }
//   socialCommentShownCount.textContent = 0;
//   for (let i = startElement; i < startElement + NUMBER_OPEN_COMMENTS; i++) { // удаляем с 5 эл-в класс 'hidden' начиная с первого найденного
//     if (!workArray[i]) { // завершаем цикл если элементы закончились
//       break;
//     }
//     openComments(workArray, i); // загружаем комментарии
//     countOpenComments(i); // меняем кол-во показанных ком-в
//     hiddenCommentLoaderButton(workArray, i); // убираем кнопку-загрузчик
//   }
// }

const manageComments2 = () => {
  const id = bigPictureImg.dataset.id; // определяем к какому именно объекту данных нужно обращаться
  const socialCommentsFragment = document.createDocumentFragment(); // фрагмент для комментариев
  const workArray = photosArray[id].comments; // массив с комментами в объекте данных
  let isOpenComments = socialCommentsCollection.length; // количество уже показанных комм-в

  socialCommentShownCount.textContent = socialCommentsCollection.length;
  for (let i = isOpenComments; i < (isOpenComments + NUMBER_OPEN_COMMENTS); i++) { // удаляем с 5 эл-в класс 'hidden' начиная с первого найденного
    if (!workArray[i]) { // завершаем цикл если элементы закончились
      break;
    }
    const newComment = createCommentsListItem2(workArray[i]); // создаем комментарий
    socialCommentsFragment.append(newComment); // загружаем его во фрагмент
  }
  socialComments.append(socialCommentsFragment); // аппендим фрагмент в блок комм-в
  isOpenComments = socialCommentsCollection.length;
  socialCommentShownCount.textContent = isOpenComments;
  if (isOpenComments === workArray.length) {
    commentsLoader.classList.add('hidden'); // скрыть кнопку-загрузчик, если все комментарии показаны
    commentsLoader.removeEventListener('click', manageComments2); // и снять с нее обработчик
  }
};

const closeBigPicture = () => { // функция закрытия окна
  bigPicture.classList.add('hidden'); // закрыть окно

  body.classList.remove('modal-open');

  commentsLoader.removeEventListener('click', manageComments2); // снять обработчик с кнопки дозагрузки комм-в

  bigPictureCancel.removeEventListener('click', closeBigPicture); // снять обработчик с крестика

  document.removeEventListener('keydown', onEscapeDown); // снять обработчик с эскейпа
};

function onEscapeDown (evt) { // функция закрытия окна по эскейпу
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

// const packBigPictureData = (array, id) => { // функция заполнения полей большого фото
//   bigPictureImg.src = array[id].url;
//   socialCaption.textContent = array[id].description;
//   socialCommentsTotal.textContent = array[id].comments.length;
//   likesCount.textContent = array[id].likes;
//   socialComments.innerHTML = '';
//   array[id].comments.forEach(createCommentsListItem);
//   socialComments.append(socialCommentsFragment);
// };

const packBigPictureData2 = (array, id) => { // функция заполнения полей большого фото
  bigPictureImg.dataset.id = id;
  bigPictureImg.src = array[id].url;
  socialCaption.textContent = array[id].description;
  socialCommentsTotal.textContent = array[id].comments.length;
  likesCount.textContent = array[id].likes;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  // array[id].comments.forEach(createCommentsListItem2);
  // socialComments.append(socialCommentsFragment);
  manageComments2();
};

const openBigPicture = (evt, array) => { // функция открытия окна
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden'); // открыть окно

    const index = evt.target.dataset.id; // определяем какой индекс у элемента, по которому кликнули, в объекте
    packBigPictureData2(array, index); // заполняем модальное окно данными большого фото из объекта
    body.classList.add('modal-open');
    // commentsLoader.classList.remove('hidden');
    // manageComments(); // сразу загружаем 5 комментариев
    commentsLoader.addEventListener('click', manageComments2); // вешаем обработчик на кнопку загрузки комм-в

    bigPictureCancel.addEventListener('click', closeBigPicture); // повесить обработчик на крестик

    document.addEventListener('keydown', onEscapeDown); // повесить обработчик на эскейп
  }
};

export { openBigPicture };
