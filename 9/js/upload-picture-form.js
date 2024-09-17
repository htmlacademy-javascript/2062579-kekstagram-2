import {isEscapeKey} from './utilities.js';
import {isHashtagsValid, errorHashtagMessage} from './validation-hashtags.js';
import {validateCommentLength, errorCommentMessage} from './validation-comments.js';

// форма загрузки изображения
const pictureUploadFormElement = document.querySelector('.img-upload__form');
// инпут загрузки изображения
const pictureUploadFileElement = pictureUploadFormElement.querySelector('.img-upload__input');
// раздел редактирования изображения
const pictureUploadOverlayElement = pictureUploadFormElement.querySelector('.img-upload__overlay');
// кнопка закрытия формы
const pictureUploadCancelElement = pictureUploadFormElement.querySelector('.img-upload__cancel');
// поле ввода хэштегов
const inputHashtagsElement = pictureUploadFormElement.querySelector('.text__hashtags');
// поле ввода комментария
const textCommentElement = pictureUploadFormElement.querySelector('.text__description');

// подключаю и настраиваю Pristine
const pristine = new Pristine(pictureUploadFormElement, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// закрытие формы
const closePictureUploadForm = () => {
  // убираю класс modal-open со страницы
  document.body.classList.remove('modal-open');
  // скрываю элементы настройки изображения
  pictureUploadOverlayElement.classList.add('hidden');
  // сбрасываю значения в форме
  pictureUploadFormElement.reset();
  // удаляю прослушиватель на клавише Esc
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscapeKeyDown);
};

// закрываю форму клавишей Esc
const onEscapeKeyDown = (evt) => {
  // проверяю, что фокус не на полях ввода хэштегов и комментария
  if (isEscapeKey(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    evt.preventDefault();
    closePictureUploadForm();
  }
};

// открытие формы
const openPictureUploadForm = () => {
  // вешаю класс modal-open на страницу
  document.body.classList.add('modal-open');
  // показываю элементы настройки изображения
  pictureUploadOverlayElement.classList.remove('hidden');
  // вешаю прослушиватель на кнопку закрытия формы
  pictureUploadCancelElement.addEventListener('click', closePictureUploadForm);
  // вешаю на страницу прослушиваетль на Esc
  document.addEventListener('keydown', onEscapeKeyDown);
};

// отправка формы
const submitPictureUploadForm = (evt) => {
  evt.preventDefault();
  // проверка на прохождение валидации
  if(pristine.validate()) {
    inputHashtagsElement.value = inputHashtagsElement.value.trim().replaceAll(/\s+/g, ' '); // отсекаю пробелы по краям и заменяю все варианты пробелов на один обычный
    pictureUploadFormElement.submit();
  }
};

// валидация хэштегов в Pristine
pristine.addValidator(inputHashtagsElement, isHashtagsValid, errorHashtagMessage);

// валидация комментария в Pristine
pristine.addValidator(textCommentElement, validateCommentLength, errorCommentMessage);

// вешаю прослушиватель на инпут загрузки изображения
pictureUploadFileElement.addEventListener('change', openPictureUploadForm);

// добавляю прослушиватель на форму для отправки
pictureUploadFormElement.addEventListener('submit', submitPictureUploadForm);

