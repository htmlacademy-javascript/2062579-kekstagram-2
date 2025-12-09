import { pristine } from './validation-form.js'; // импорт данных валидации полей формы
import { SCALE_PARAMETERS, onClickDownscaleButton, onClickUpscaleButton } from './scale-photo.js'; // импорт данных изменения масштаба превью
import { onChangeEffect } from './add-effects.js'; // импорт данных работы фильтров
import { setFormData } from './interaction-server.js'; // импорт функции отправки данных на сервер
import { showErrorMessage } from './utils.js';

const ALLOWED_FILES = ['jpg', 'jpeg', 'png', 'svg', 'webp']; // разрешенные типы файлов для загрузки
const NOT_ALLOWED_FILE = { // параметры сообщения при выборе неверного типа файла
  TEXT: 'Выберите файл с изображением: jpg, png, svg или webp',
  TIMEOUT: 4000
};
const body = document.querySelector('body');
const uploadImageForm = document.querySelector('.img-upload__form'); // форма загрузки фото
const uploadImageInput = uploadImageForm.querySelector('#upload-file'); // поле загрузки фото
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay'); // окно загрузки комм-я
const uploadImageCancel = uploadImageForm.querySelector('.img-upload__cancel'); // кнопка закрытия
const effectsPreviews = uploadImageForm.querySelectorAll('.effects__preview'); // превьюшки в фильтрах
const effectLevelContainer = document.querySelector('.img-upload__effect-level'); // контейнер слайдера
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка
const effectsList = document.querySelector('.effects__list'); // список превьюшек фильтров
const commentField = uploadImageForm.querySelector('.text__description'); // поле ввода комментария
const hashtagsField = uploadImageForm.querySelector('.text__hashtags'); // поле ввода хэштэгов
const scaleControlSmaller = document.querySelector('.scale__control--smaller'); // кнопка уменьшения масштаба
const scaleControlBigger = document.querySelector('.scale__control--bigger'); // кнопка увеличения масштаба

const onSubmitForm = setFormData(onClickCanselButton); // для передачи в добавление и удаление обработчиков

/* функция установки обработчиков на кнопки модалки формы */
const setFormHandlers = () => {
  uploadImageCancel.addEventListener('click', onClickCanselButton); // обработчик на крестик (3)
  uploadImageForm.addEventListener('submit', onSubmitForm); // обработчик валидации формы (3)
  scaleControlSmaller.addEventListener('click', onClickDownscaleButton); // обработчик кнопки уменьшения масштаба превью (3)
  scaleControlBigger.addEventListener('click', onClickUpscaleButton); // обработчик кнопки увеличения масштаба превью (3)
  effectsList.addEventListener('change', onChangeEffect); // обработчик выбора фильтра (3)
};

function onClickCanselButton () { // функция закрытия формы
  uploadImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeDown); // снятие обработчика с эскейпа
  uploadImageForm.reset(); // сброс полей формы
  pristine.reset(); // сброс валидации
  uploadImagePreview.src = 'img/upload-default-image.jpg'; // сброс превью
  uploadImagePreview.style.scale = `${SCALE_PARAMETERS.MAX}%`; // сброс значения масштаба превью
  effectsPreviews.forEach((effectsPreview) => { // сброс превьюшек эффектов
    effectsPreview.style.backgroundImage = '';
  });
  uploadImagePreview.removeAttribute('style'); // сброс стилей фильтра
  effectLevelContainer.classList.add('hidden'); // скрытие слайдера
}

function onEscapeDown (evt) { // функция закрытия окна по эскейпу
  const errorMessage = document.querySelector('.error'); // ищем окно об ошибке загрузки фото
  if (evt.key === 'Escape') {
    if (document.activeElement === commentField || document.activeElement === hashtagsField || errorMessage) { // при фокусе на полях ввода или наличии сообщения об ошибке загрузки - отключаем закрытие по эскейп
      evt.stopPropagation();
    } else {
      onClickCanselButton();
    }
  }
}

const onChangeUploadInput = (evt) => { // функция открытия формы
  uploadImageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  const file = evt.target.files[0];

  const fileName = file.name.toLowerCase(); // готовим проверку на тип файла
  const checkFileType = ALLOWED_FILES.some((fileType) => fileName.endsWith(fileType));

  if (checkFileType) {
    const source = URL.createObjectURL(file);
    uploadImagePreview.src = source; // подставляем загруженное фото в превью
    effectsPreviews.forEach((effectsPreview) => { // и в превьюшки эффектов
      effectsPreview.style.backgroundImage = `url(${source})`;
    });
  } else {
    onClickCanselButton(); // если выбран не подходящий тип файла закрываем форму
    showErrorMessage(NOT_ALLOWED_FILE.TEXT, NOT_ALLOWED_FILE.TIMEOUT);
  }
  document.addEventListener('keydown', onEscapeDown); // обработчик на эскейп
};

const onChangeImageInput = () => uploadImageInput.addEventListener('change', onChangeUploadInput);

export { setFormHandlers, onChangeImageInput };
