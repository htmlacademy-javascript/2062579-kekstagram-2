import {createShowingComments, deleteShowingComments} from './create-comments.js';
import {isEscapeKey} from './utilities.js';

// элемент с большой картинкой в ДОМ
const bigPictureElement = document.querySelector('.big-picture');
// закрывающий крестик на большой картинке
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
// элемент с изображением большой картинки
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img').querySelector('IMG');
// элемент со счетчиком лайков на большой картинке
const bigPictureLikesCountElement = bigPictureElement.querySelector('.likes-count');
// элемент с описанием картинки
const bigPictureCaptionElement = bigPictureElement.querySelector('.social__caption');
// контейнер для изображений
const picturesListElement = document.querySelector('.pictures');
// страница
const body = document.querySelector('BODY');

// функция закрывания большой картинки
const closeBigPicture = () => {
  // очищаю блок с комментариями
  deleteShowingComments();
  // скрываю большую картинку
  bigPictureElement.classList.add('hidden');
  // снимаю класс .modal-open со страницы
  body.classList.remove('modal-open');
  // удаляю обработчик по нажатию Esc
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscapeKeyDown);
};

//
const onPictureCloseClick = () => closeBigPicture();

// функция закрывания большой картинки нажатием на Esc
const onEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

// функция показа полноразмерной картинки
const showBigPicture = (picturesArray, pictureId) => {
  // нахожу нужную картинку в блоке с данными
  const currentPicture = picturesArray.find((picture) => picture.id === Number(pictureId));
  // вставляю саму картинку
  bigPictureImageElement.src = currentPicture.url;
  // вставляю количество лайков
  bigPictureLikesCountElement.textContent = currentPicture.likes;
  // заполняю описание большой картинки
  bigPictureCaptionElement.textContent = currentPicture.description;

  createShowingComments(currentPicture.comments);
  // открываю большую картинку
  bigPictureElement.classList.remove('hidden');
  // вешаю класс .modal-open на страницу
  body.classList.add('modal-open');
  // закрываю большую картинку клавишей Esc
  document.addEventListener('keydown', onEscapeKeyDown);
};

const renderFullPicture = (picturesArray) => {
  // открываю большую картинку кликом по миниатюре
  picturesListElement.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      // отменяю переход по ссылке при клике
      evt.preventDefault();
      showBigPicture(picturesArray, currentPicture.dataset.pictureId);
    }
  });

  // закрываю большую картинку кликом по крестику
  bigPictureCloseElement.addEventListener('click', onPictureCloseClick);
};

export {renderFullPicture};
