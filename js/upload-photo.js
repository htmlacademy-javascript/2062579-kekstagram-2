import { pristine } from './validation-form.js'; // импорт данных валидации полей формы
import { SCALE_PARAMETERS, smallPhotoScale, bigPhotoScale } from './scale-photo.js'; // импорт данных изменения масштаба превью
import { checkEffect } from './add-effects.js'; // импорт данных работы фильтров
import { setFormData } from './interaction-server.js'; // импорт функции отправки данных на сервер

const body = document.querySelector('body');
const uploadImageForm = document.querySelector('.img-upload__form'); // форма загрузки фото
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

const onSubmitForm = setFormData(closeUploadForm); // для передачи в добавление и удаление обработчиков

function closeUploadForm () { // функция закрытия формы
  uploadImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadImageCancel.removeEventListener('click', closeUploadForm); // снятие обработчика с крестика

  document.removeEventListener('keydown', onEscapeDown); // снятие обработчика с эскейпа

  uploadImageForm.removeEventListener('submit', onSubmitForm); // удаление обработчика отправки формы

  uploadImageForm.reset(); // сброс полей формы

  pristine.reset(); // сброс валидации

  scaleControlSmaller.removeEventListener('click', smallPhotoScale); // снятие обработчика кнопки уменьшения масштаба превью
  scaleControlBigger.removeEventListener('click', bigPhotoScale); // снятие обработчика кнопки увеличения масштаба превью

  uploadImagePreview.style.scale = `${SCALE_PARAMETERS.MAX}%`; // сброс значения масштаба превью

  effectsList.removeEventListener('change', checkEffect); // снятие обработчика выбора фильтров
  uploadImagePreview.removeAttribute('style'); // сброс стилей фильтра
  effectLevelContainer.classList.add('hidden'); // скрытие слайдера
}

function onEscapeDown (evt) { // функция закрытия окна по эскейпу
  const errorMessage = document.querySelector('.error'); // ищем окно об ошибке загрузки фото
  if (evt.key === 'Escape') {
    if (document.activeElement === commentField || document.activeElement === hashtagsField || errorMessage) { // при фокусе на полях ввода или наличии сообщения об ошибке загрузки - отключаем закрытие по эскейп
      evt.stopPropagation();
    } else {
      closeUploadForm();
    }
  }
}

const openUploadForm = (evt) => { // функция открытия формы
  uploadImageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  /* следующие две строки потребовались, чтобы обойти ошибку 'not allowed to load local resource' */
  const file = evt.target.files[0];
  const source = URL.createObjectURL(file);

  uploadImagePreview.src = source; // подставляем загруженное фото в превью

  effectsPreviews.forEach((effectsPreview) => { // и в превьюшки эффектов
    effectsPreview.style.backgroundImage = `url(${source})`;
  });

  uploadImageCancel.addEventListener('click', closeUploadForm); // обработчик на крестик

  document.addEventListener('keydown', onEscapeDown); // обработчик на эскейп

  uploadImageForm.addEventListener('submit', onSubmitForm); // обработчик валидации формы

  scaleControlSmaller.addEventListener('click', smallPhotoScale); // обработчик кнопки уменьшения масштаба превью
  scaleControlBigger.addEventListener('click', bigPhotoScale); // обработчик кнопки увеличения масштаба превью

  effectsList.addEventListener('change', checkEffect); // обработчик выбора фильтра
};

export { closeUploadForm, openUploadForm };
