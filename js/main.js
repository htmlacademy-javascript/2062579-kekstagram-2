import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице
import { onClickSmallPhoto } from './create-big-picture.js'; // импорт функции открытия/закрытия большого изображения
import { onChangeImageInput } from './upload-photo.js'; // импорт функции загрузки изображения
import { pristineValidateComment, pristineValidateHashtags } from './validation-form.js'; // импорт данных валидации полей ввода формы
import { onChangeEffectStyle } from './add-effects.js'; // импорт данных для работы слайдера
import { photosArray } from './interaction-server.js'; // импорт данных с сервера

/* отрисовываем изображения по данным с сервера */
createPictures(photosArray);

/* открываем большое фото по клику на маленьких */
onClickSmallPhoto();

/* открываем форму загрузки фото */
onChangeImageInput();

/* валидируем поля ввода формы загрузки фото */
pristineValidateComment(); // проверка комментария
pristineValidateHashtags(); // проверка хэштэгов

/* изменение эффектов и значения слайдера */
onChangeEffectStyle();
