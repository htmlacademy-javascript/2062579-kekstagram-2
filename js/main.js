import { showErrorMessage, /*getUnicRandomIds,*/ throttle } from './utils.js'; // импорт функции вызова сообщения об ошибке
import { getServerData } from './api.js'; // импорт данных с сервера
import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице
import { setBigPictureHandlers, onClickSmallPhoto } from './create-big-picture.js'; // импорт функции открытия/закрытия большого изображения
import { setFormHandlers, onChangeImageInput } from './upload-photo.js'; // импорт функции загрузки изображения
import { pristineValidateComment, pristineValidateHashtags } from './validation-form.js'; // импорт данных валидации полей ввода формы
import { onChangeEffectStyle } from './add-effects.js'; // импорт данных для работы слайдера
import { showFilterButtons, checkFilter } from './filter-pictures.js'; // импорт функций для фильтрации фото

const imgFilters = document.querySelector('.img-filters'); // блок с фильтрами
const imgFiltersForm = imgFilters.querySelector('.img-filters__form'); // форма

/* загружаем данные с сервера */
const photosArray = await getServerData(showErrorMessage);

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

/* показываем фильтры */
showFilterButtons(photosArray);

/* функция-обработчик выбора фильтра */
const onChangeFilter = checkFilter(photosArray);

/* функция установки обработчика на выбор фильтра */
const setFilterChange = () => imgFiltersForm.addEventListener('click', throttle(onChangeFilter, 500));

/* установка обработчика на выбор фильтра */
setFilterChange();
