// константа с количеством комментариев для загрузки
const NUMBER_COMMENTS = 5;
// начальное количество комментариев
let currentCount = 0;
// массив со всеми комментариями фото
let comments = [];

// элемент с большой картинкой в ДОМ
const bigPictureElement = document.querySelector('.big-picture');

// элемент со списком комментариев большой картинки
const bigPictureCommentsListElement = bigPictureElement.querySelector('.social__comments');
// элемент одного комментария из списка
const bigPictureCommentItemElement = bigPictureElement.querySelector('.social__comment');
// элемент-строка с количеством комментариев
const bigPictureCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
// элемент-кнопка для загрузки следующих комментариев
const bigPictureCommentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
// очистка списка с комментариями в DOM
bigPictureCommentsListElement.innerHTML = '';
// функция создания подгружаемых комментариев
const createNextShowingComments = () => {
  const pictureCommentsFragment = document.createDocumentFragment();
  // выбираю отображаемые комментарии, с какого по какой из всего массива
  const showingComments = comments.slice(currentCount, currentCount + NUMBER_COMMENTS);
  // количество отображаемых комментариев
  const showingCommentsLength = showingComments.length + currentCount;
  // формирую показываемый список в DOM
  showingComments.forEach((comment) => {
    const bigPictureCommentItem = bigPictureCommentItemElement.cloneNode(true);

    bigPictureCommentItem.querySelector('.social__picture').src = comment.avatar;
    bigPictureCommentItem.querySelector('.social__picture').alt = comment.name;
    bigPictureCommentItem.querySelector('.social__text').textContent = comment.message;

    pictureCommentsFragment.appendChild(bigPictureCommentItem);
  });

  bigPictureCommentsListElement.appendChild(pictureCommentsFragment);

  bigPictureCommentsCountElement.querySelector('.social__comment-shown-count').textContent = showingCommentsLength;
  bigPictureCommentsCountElement.querySelector('.social__comment-total-count').textContent = comments.length;
  // убираю кнопку показа следующих комментариев, если уже все загружены
  if (showingCommentsLength >= comments.length) {
    bigPictureCommentsLoaderElement.classList.add('hidden');
  }
  // обновляю значение текущего счетчика показанных комментариев
  currentCount += NUMBER_COMMENTS;
};
// функция показа блока комментариев (при открытии большой картинки)
const createShowingComments = (currentPictureComments) => {
  comments = currentPictureComments;
  createNextShowingComments();

  bigPictureCommentsLoaderElement.addEventListener('click', createNextShowingComments);
};
// функция очистки блока комментариев (при закрытии большой картинки)
const deleteShowingComments = () => {
  currentCount = 0;
  bigPictureCommentsListElement.innerHTML = '';
  bigPictureCommentsLoaderElement.classList.remove('hidden');
  bigPictureCommentsLoaderElement.removeEventListener('click', createNextShowingComments);
};

export {createShowingComments, deleteShowingComments};
