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
const socialCommentsItems = socialComments.children; // все комментарии к фото
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
const onClickCommentsLoader = (array) => {
  const id = bigPictureImg.dataset.id; // определяем к какому именно объекту данных нужно обращаться
  const socialCommentsFragment = document.createDocumentFragment(); // фрагмент для комментариев
  const workArray = array[id].comments; // массив с комментами в объекте данных
  let isOpenComments = socialCommentsItems.length; // количество уже показанных комм-в

  socialCommentShownCount.textContent = isOpenComments; // записываем сколько комм-в показано
  for (let i = isOpenComments; i < (isOpenComments + NUMBER_OPEN_COMMENTS); i++) { // удаляем с 5 эл-в класс 'hidden' начиная с первого найденного
    if (!workArray[i]) { // завершаем цикл если элементы закончились
      break;
    }
    const newComment = createCommentsListItem(workArray[i]); // создаем комментарий
    socialCommentsFragment.append(newComment); // загружаем его во фрагмент
  }
  socialComments.append(socialCommentsFragment); // аппендим фрагмент в блок комм-в
  isOpenComments = socialCommentsItems.length; // меняем кол-во показанных комм-в
  socialCommentShownCount.textContent = isOpenComments; // и отображаем это кол-во
  if (isOpenComments === workArray.length) {
    commentsLoader.classList.add('hidden'); // скрыть кнопку-загрузчик, если все комментарии показаны
  }
};

/* функция закрытия окна */
const onClickResetButton = () => {
  bigPicture.classList.add('hidden'); // закрыть окно
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeDown); // снять обработчик с эскейпа
};

/* функция установки обработчиков на кнопки модалки с большим фото */
const setBigPictureHandlers = (array) => {
  commentsLoader.addEventListener('click', () => onClickCommentsLoader(array)); // вешаем обработчик на кнопку загрузки комм-в
  bigPictureCancel.addEventListener('click', onClickResetButton); // повесить обработчик на крестик
};

/* функция закрытия окна по эскейпу */
function onEscapeDown (evt) {
  if (evt.key === 'Escape') {
    onClickResetButton();
  }
}

/* функция заполнения полей большого фото */
const packBigPictureData = (array, id) => {
  bigPictureImg.dataset.id = id;
  bigPictureImg.src = array[id].url;
  socialCaption.textContent = array[id].description;
  socialCommentsTotal.textContent = array[id].comments.length;
  likesCount.textContent = array[id].likes;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  onClickCommentsLoader(array);
};

/* функция открытия окна при клике на миниатюру */
const onClickSmallPhoto = (evt, array) => {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden'); // открыть окно
    const index = evt.target.dataset.id; // определяем какой индекс у элемента, по которому кликнули, в объекте
    packBigPictureData(array, index); // заполняем модальное окно данными большого фото из объекта
    body.classList.add('modal-open');
    document.addEventListener('keydown', onEscapeDown); // повесить обработчик на эскейп
  }
};

const openBigPicture = (array) => picturesContainer.addEventListener('click', (evt) => onClickSmallPhoto(evt, array));

export { setBigPictureHandlers, openBigPicture };
