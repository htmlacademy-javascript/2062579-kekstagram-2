import { getServerData } from './interaction-server.js'; // импорт данных с сервера
import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице
import { setBigPictureHandlers, onClickSmallPhoto } from './create-big-picture.js'; // импорт функции открытия/закрытия большого изображения
import { setFormHandlers, onChangeImageInput } from './upload-photo.js'; // импорт функции загрузки изображения
import { pristineValidateComment, pristineValidateHashtags } from './validation-form.js'; // импорт данных валидации полей ввода формы
import { onChangeEffectStyle } from './add-effects.js'; // импорт данных для работы слайдера

/* загружаем данные с сервера */
const photosArray = await getServerData();

/* отрисовываем изображения по данным с сервера */
createPictures(photosArray);

/* устанавливаем обработчики кнопок на большом фото */
setBigPictureHandlers(photosArray);

/* открываем большое фото по клику на маленьких */
onClickSmallPhoto(photosArray);

/* устанавливаем обработчики кнопок на форме загрузки фото */
setFormHandlers();

/* открываем форму загрузки фото */
onChangeImageInput();

/* валидируем поля ввода формы загрузки фото */
pristineValidateComment(); // проверка комментария
pristineValidateHashtags(); // проверка хэштэгов

/* подключаем изменение эффектов и значения слайдера */
onChangeEffectStyle();
