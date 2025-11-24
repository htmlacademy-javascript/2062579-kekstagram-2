import { commentField, hashtagsField, validateUploadPhotoForm, pristine } from './validation-form.js'; // импорт данных валидации полей формы
import { SCALE_PARAMETERS, scaleControlSmaller, scaleControlBigger, smallPhotoScale, bigPhotoScale } from './scale-photo.js'; // импорт данных изменения масштаба превью
import { effectLevelContainer, uploadImagePreview, effectsList, checkEffect } from './add-effects.js'; // импорт данных работы фильтров

const BODY = document.querySelector('BODY');
const uploadImageForm = document.querySelector('.img-upload__form'); // форма загрузки фото
export const uploadImageInput = uploadImageForm.querySelector('.img-upload__input'); // поле загрузки фото
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay'); // окно загрузки комм-я
// const uploadImagePreview = uploadImageForm.querySelector('.img-upload__preview img'); // превьюшка
const uploadImageCancel = uploadImageForm.querySelector('.img-upload__cancel'); // кнопка закрытия
const effectsPreviews = uploadImageForm.querySelectorAll('.effects__preview'); // превьюшки в фильтрах

const closeUploadForm = () => { // функция закрытия формы
  uploadImageOverlay.classList.add('hidden');
  BODY.classList.remove('modal-open');

  uploadImageCancel.removeEventListener('click', closeUploadForm); // снятие обработчика с крестика

  document.removeEventListener('keydown', onEscapeDown); // снятие обработчика с эскейпа

  uploadImageForm.removeEventListener('submit', validateUploadPhotoForm); // удаление обработчик отправки формы

  uploadImageForm.reset(); // сброс полей формы

  pristine.reset(); // сброс валидации

  scaleControlSmaller.removeEventListener('click', smallPhotoScale); // снятие обработчика кнопки уменьшения масштаба превью
  scaleControlBigger.removeEventListener('click', bigPhotoScale); // снятие обработчика кнопки увеличения масштаба превью

  uploadImagePreview.style.scale = `${SCALE_PARAMETERS.MAX}%`; // сброс значения масштаба превью

  effectsList.removeEventListener('change', checkEffect); // снятие обработчика выбора фильтров
  uploadImagePreview.removeAttribute('style'); // сброс стилей фильтра
  effectLevelContainer.classList.add('hidden'); // скрытие слайдера
};

function onEscapeDown (evt) { // функция закрытия окна по эскейпу
  if (evt.key === 'Escape') {
    if (document.activeElement === commentField || document.activeElement === hashtagsField) { // при фокусе на полях ввода отключаем закрытие по эскейп
      evt.stopPropagation();
    } else {
      closeUploadForm();
    }
  }
}

export const openUploadForm = (evt) => { // функция открытия формы
  uploadImageOverlay.classList.remove('hidden');
  BODY.classList.add('modal-open');
  /* следующие две строки потребовались, чтобы обойти ошибку 'not allowed to load local resource' */
  const file = evt.target.files[0];
  const source = URL.createObjectURL(file);

  uploadImagePreview.src = source; // подставляем загруженное фото в превью

  effectsPreviews.forEach((effectsPreview) => { // и в превьюшки эффектов
    effectsPreview.style.backgroundImage = `url(${source})`;
  });

  uploadImageCancel.addEventListener('click', closeUploadForm); // обработчик на крестик

  document.addEventListener('keydown', onEscapeDown); // обработчик на эскейп

  uploadImageForm.addEventListener('submit', validateUploadPhotoForm); // обработчик валидации формы

  scaleControlSmaller.addEventListener('click', smallPhotoScale); // обработчик кнопки уменьшения масштаба превью
  scaleControlBigger.addEventListener('click', bigPhotoScale); // обработчик кнопки увеличения масштаба превью

  effectsList.addEventListener('change', checkEffect); // обработчик выбора фильтра
};
