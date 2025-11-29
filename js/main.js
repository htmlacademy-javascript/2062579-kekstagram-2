import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице
import { picturesContainer, openBigPicture } from './create-big-picture.js'; // импорт функции открытия/закрытия большого изображения
import { uploadImageInput, openUploadForm } from './upload-photo.js'; // импорт функции загрузки изображения
import { MAX_COMMENT_LENGTH, commentField, hashtagsField, pristine, validateComment, createErrorHashtagMessage, validateHashTagRules } from './validation-form.js'; // импорт данных валидации полей ввода формы
import { effectLevelSlider, effectLevelValue, uploadImagePreview, effectStyle } from './add-effects.js'; // импорт данных для работы слайдера
import { getServerData } from './interaction-server.js'; // импорт функции загрузки данных с сервера

/* загрузка данных с сервера */
const photosArray = await getServerData(); // загружаем данные с сервера
createPictures(photosArray); // отрисовываем изображения

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

/* отправляем данные */

