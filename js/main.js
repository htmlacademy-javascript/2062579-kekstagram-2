import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице
import { openBigPicture } from './create-big-picture.js'; // импорт функции открытия/закрытия большого изображения
import { openUploadForm } from './upload-photo.js'; // импорт функции загрузки изображения
import { MAX_COMMENT_LENGTH, pristine, validateComment, createErrorHashtagMessage, validateHashTagRules } from './validation-form.js'; // импорт данных валидации полей ввода формы
import { effectStyle } from './add-effects.js'; // импорт данных для работы слайдера
// import { getServerData } from './interaction-server.js'; // импорт функции загрузки данных с сервера
import { photosArray } from './interaction-server.js'; // импорт данных с сервера

const effectLevelSlider = document.querySelector('.effect-level__slider'); // слайдер
const effectLevelValue = document.querySelector('.effect-level__value'); // значение слайдера
const picturesContainer = document.querySelector('.pictures'); // контейнер с фото
const uploadImagePreview = document.querySelector('.img-upload__preview img'); // превьюшка
const uploadImageForm = document.querySelector('.img-upload__form'); // форма загрузки фото
const commentField = uploadImageForm.querySelector('.text__description'); // поле ввода комментария
const uploadImageInput = uploadImageForm.querySelector('.img-upload__input'); // поле загрузки фото
const hashtagsField = uploadImageForm.querySelector('.text__hashtags'); // поле ввода хэштэгов

/* загрузка данных с сервера */
// const photosArray = await getServerData(); // загружаем данные с сервера
createPictures(photosArray); // отрисовываем изображения
// console.log(photosArray);

/* открываем большое фото */
picturesContainer.addEventListener('click', (evt) => openBigPicture(evt, photosArray));

/* открываем форму загрузки фото */
uploadImageInput.addEventListener('change', openUploadForm);

/* валидируем поля ввода формы загрузки фото */
pristine.addValidator(commentField, validateComment, `Не более ${MAX_COMMENT_LENGTH} символов`); // проверка комментария
pristine.addValidator(hashtagsField, validateHashTagRules, createErrorHashtagMessage); // проверка хэштэгов

/* слайдер и фильтры */
effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  uploadImagePreview.style.filter = effectStyle();
});
