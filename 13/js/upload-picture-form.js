import {isEscapeKey} from './utilities.js';
import {isHashtagsValid, errorHashtagMessage} from './validation-hashtags.js';
import {validateCommentLength, errorCommentMessage} from './validation-comments.js';
import {onEffectChange, resetEffects} from './control-slider-effects.js';
import {resetScale} from './control-scale-picture.js';
import {postServerData} from './communication-server.js';
import {appendNotification} from './upload-notification.js';

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
// список выбора эффектов
const effectListElement = pictureUploadFormElement.querySelector('.effects__list');
// кнопка отправки формы
const pictureUploadFormButton = pictureUploadFormElement.querySelector('.img-upload__submit');
// элемент с превью загружаемого фото
const pictureUploadPreview = pictureUploadFormElement.querySelector('.img-upload__preview > img');
// элементы превью с эффектами
const pictureEffectsPreview = pictureUploadFormElement.querySelectorAll('.effects__preview');
// массив допустимых типов файлов для загрузки
const FILE_TYPES = ['image/png', 'image/gif', 'image/jpeg'];
// шаблон сообщения об успешной отправке фото
const templateSuccessElement = document.querySelector('#success').content;
// шаблон сообщения об ошибке при отправке фото
const templateErrorElement = document.querySelector('#error').content;
// базовый текст на кнопке
const BASIC_TEXT = 'Опубликовать';
// текст на кнопке при отправке
const PROCESS_TEXT = 'Отправка...';
// функция блокировки кнопки отправки формы
const disableFormButton = () => {
  pictureUploadFormButton.disabled = true;
  pictureUploadFormButton.textContent = PROCESS_TEXT;
};
// функция разблокировки кнопки отправки формы
const enableFormButton = () => {
  pictureUploadFormButton.disabled = false;
  pictureUploadFormButton.textContent = BASIC_TEXT;
};

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
  // сбрасываю значения полей формы
  resetEffects();
  resetScale();
  // удаляю прослушиватель на клавише Esc
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onEscapeKeyDown);
};

// закрываю форму клавишей Esc
const onEscapeKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    // проверяю, что фокус на полях ввода хэштегов и комментария
    if(document.activeElement === inputHashtagsElement || document.activeElement === textCommentElement) {
      evt.stopPropagation();
    } else {
      closePictureUploadForm();
    }
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

// функция подстановки изображения в превью
const onPhotoUpload = () => {
  // забираю из инпута загруженный файл
  const file = pictureUploadFileElement.files[0];
  // определяю тип файла
  const fileType = file.type;
  // задаю проверку по типу файла
  const matchesTypeFile = FILE_TYPES.includes(fileType);
  if (matchesTypeFile) { // проверяю
    // создаю url-адрес для загруженного файла
    const url = URL.createObjectURL(file);
    // подставляю его в превьюшку
    pictureUploadPreview.src = url;
    // подставляю его же в превьюшки эффектов
    pictureEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  } else {
    // если неправильный файл - закрываю окно
    closePictureUploadForm();
  }
};

// функция отправки формы
const sendFormData = async (formElement) => {
  if(pristine.validate()) { // проверка на прохождение валидации
    inputHashtagsElement.value = inputHashtagsElement.value.trim().replaceAll(/\s+/g, ' '); // отсекаю пробелы по краям и заменяю все варианты пробелов на один обычный
    // собираю данные из формы
    const FormDatas = new FormData(formElement);
    // меняю состояние кнопки отправки формы на период загрузки
    disableFormButton();
    try {
      await postServerData(FormDatas);
      // открываю окно с сообщением об успешной загрузке
      appendNotification(templateSuccessElement);
      // сбрасываю значения полей формы
      resetEffects();
      resetScale();
      // закрываю форму загрузки фото
      closePictureUploadForm();
    } catch {
      // открываю окно с сообщением об ошибке загрузки
      appendNotification(templateErrorElement);
    } finally {
      // возвращаю начальное состояние кнопки отправки формы
      enableFormButton();
    }
  }
};

// отправка формы
const submitPictureUploadForm = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

// валидация хэштегов в Pristine
pristine.addValidator(inputHashtagsElement, isHashtagsValid, errorHashtagMessage);

// валидация комментария в Pristine
pristine.addValidator(textCommentElement, validateCommentLength, errorCommentMessage);

// вешаю прослушиватели на инпут загрузки изображения
pictureUploadFileElement.addEventListener('change', openPictureUploadForm);
pictureUploadFileElement.addEventListener('change', onPhotoUpload);

// добавляю прослушиватель на форму для отправки
pictureUploadFormElement.addEventListener('submit', submitPictureUploadForm);

// подключаю прослушиватель на изменение эффектов
effectListElement.addEventListener('change', onEffectChange);
