import { photosArray } from './interaction-server.js'; // импорт данных с сервера

const NUMBER_OPEN_COMMENTS = 5; // сколько комментариев показываем за один раз
const body = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures'); // контейнер с фото
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

/* функция создания комментария */
const createCommentsListItem = (comment) => {
  const commentListItem = socialCommentsTemplate.cloneNode(true);
  const commentText = commentListItem.querySelector('.social__text');
  commentText.textContent = comment.message;
  const commentAvatar = commentListItem.querySelector('.social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;

  return commentListItem;
};

/* функция управления блоком комментариев */
const manageComments = () => {
  const id = bigPictureImg.dataset.id; // определяем к какому именно объекту данных нужно обращаться
  const socialCommentsFragment = document.createDocumentFragment(); // фрагмент для комментариев
  const workArray = photosArray[id].comments; // массив с комментами в объекте данных
  let isOpenComments = socialCommentsCollection.length; // количество уже показанных комм-в

  socialCommentShownCount.textContent = isOpenComments; // записываем сколько комм-в показано
  for (let i = isOpenComments; i < (isOpenComments + NUMBER_OPEN_COMMENTS); i++) { // удаляем с 5 эл-в класс 'hidden' начиная с первого найденного
    if (!workArray[i]) { // завершаем цикл если элементы закончились
      break;
    }
    const newComment = createCommentsListItem(workArray[i]); // создаем комментарий
    socialCommentsFragment.append(newComment); // загружаем его во фрагмент
  }
  socialComments.append(socialCommentsFragment); // аппендим фрагмент в блок комм-в
  isOpenComments = socialCommentsCollection.length; // меняем кол-во показанных комм-в
  socialCommentShownCount.textContent = isOpenComments; // и отображаем это кол-во
  if (isOpenComments === workArray.length) {
    commentsLoader.classList.add('hidden'); // скрыть кнопку-загрузчик, если все комментарии показаны
    commentsLoader.removeEventListener('click', manageComments); // и снять с нее обработчик
  }
};

const closeBigPicture = () => { // функция закрытия окна
  bigPicture.classList.add('hidden'); // закрыть окно

  body.classList.remove('modal-open');

  commentsLoader.removeEventListener('click', manageComments); // снять обработчик с кнопки дозагрузки комм-в

  bigPictureCancel.removeEventListener('click', closeBigPicture); // снять обработчик с крестика

  document.removeEventListener('keydown', onEscapeDown); // снять обработчик с эскейпа
};

function onEscapeDown (evt) { // функция закрытия окна по эскейпу
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

const packBigPictureData = (array, id) => { // функция заполнения полей большого фото
  bigPictureImg.dataset.id = id;
  bigPictureImg.src = array[id].url;
  socialCaption.textContent = array[id].description;
  socialCommentsTotal.textContent = array[id].comments.length;
  likesCount.textContent = array[id].likes;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  manageComments();
};

const openBigPicture = (evt, array) => { // функция открытия окна
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden'); // открыть окно

    const index = evt.target.dataset.id; // определяем какой индекс у элемента, по которому кликнули, в объекте
    packBigPictureData(array, index); // заполняем модальное окно данными большого фото из объекта
    body.classList.add('modal-open');

    commentsLoader.addEventListener('click', manageComments); // вешаем обработчик на кнопку загрузки комм-в

    bigPictureCancel.addEventListener('click', closeBigPicture); // повесить обработчик на крестик

    document.addEventListener('keydown', onEscapeDown); // повесить обработчик на эскейп
  }
};

const onClickSmallPhoto = () => picturesContainer.addEventListener('click', (evt) => openBigPicture(evt, photosArray));

export { onClickSmallPhoto };
