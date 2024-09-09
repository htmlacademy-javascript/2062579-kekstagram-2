import {picturesListElement} from './create-pictures.js';
import {picturesDescriptionsArray} from './create-pictures.js';

// элемент с большой картинкой в ДОМ
const bigPictureElement = document.querySelector('.big-picture');

// закрывающий крестик на большой картинке
const bigPictureCloseElement = bigPictureElement.querySelector('.big-picture__cancel');
// элемент с изображением большой картинки
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img').querySelector('IMG');
// элемент со счетчиком лайков на большой картинке
const bigPictureLikesCountElement = bigPictureElement.querySelector('.likes-count');
// элемент со списком комментариев большой картинки
const bigPictureCommentsListElement = bigPictureElement.querySelector('.social__comments');
// элемент одного комментария из списка
const bigPictureCommentItemElement = bigPictureElement.querySelector('.social__comment');
// элемент с описанием картинки
const bigPictureCaptionElement = bigPictureElement.querySelector('.social__caption');
// элемент с количеством комментариев
const bigPictureCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
// элемент-кнопка для добавления нового комментария
const bigPictureCommentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
// страница
const body = document.querySelector('BODY');

// функция закрывания большой картинки
const closeBigPicture = () => {
  // скрываю большую картинку
  bigPictureElement.classList.add('hidden');
  // снимаю класс .modal-open со страницы
  body.classList.remove('modal-open');
  // удаляю обработчик по нажатию Esc
  document.removeEventListener('keydown', onEscapeKeyDown);
};

// функция закрывания большой картинки нажатием на Esc
const onEscapeKeyDown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

// функция показа полноразмерной картинки
const showBigPicture = (pictureId) => {
  // нахожу нужную картинку в блоке с данными
  const currentPicture = picturesDescriptionsArray.find((picture) => picture.id === Number(pictureId));
  // создаю фрагмент для комментариев большой картинки
  const pictureCommentsFragment = document.createDocumentFragment();

  bigPictureImageElement.src = currentPicture.url;
  bigPictureLikesCountElement.textContent = currentPicture.likes;
  bigPictureCommentsListElement.innerHTML = '';

  currentPicture.comments.forEach((comment) => {
    const bigPictureCommentItem = bigPictureCommentItemElement.cloneNode(true);

    bigPictureCommentItem.querySelector('.social__picture').src = comment.avatar;
    bigPictureCommentItem.querySelector('.social__picture').alt = comment.name;
    bigPictureCommentItem.querySelector('.social__text').textContent = comment.message;

    pictureCommentsFragment.appendChild(bigPictureCommentItem);
  });

  bigPictureCommentsListElement.appendChild(pictureCommentsFragment);
  // заполняю описание большой картинки
  bigPictureCaptionElement.textContent = currentPicture.description;
  // прячу элементы, которые нужно убрать
  bigPictureCommentsCountElement.classList.add('hidden');
  bigPictureCommentsLoaderElement.classList.add('hidden');
  // открываю большую картинку
  bigPictureElement.classList.remove('hidden');
  // вешаю класс .modal-open на страницу
  body.classList.add('modal-open');
  // закрываю большую картинку клавишей Esc
  document.addEventListener('keydown', onEscapeKeyDown);
};

// открываю большую картинку кликом по миниатюре
picturesListElement.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    // отменяю переход по ссылке при клике
    evt.preventDefault();
    showBigPicture(currentPicture.dataset.pictureId);
  }
});

// закрываю большую картинку кликом по крестику
bigPictureCloseElement.addEventListener('click', closeBigPicture);

