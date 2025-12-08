import { showErrorMessage } from './utils.js'; // импорт функции вызова сообщения об ошибке
import { getServerData } from './api.js'; // импорт данных с сервера
import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице
import { setBigPictureHandlers, onClickSmallPhoto } from './create-big-picture.js'; // импорт функции открытия/закрытия большого изображения
import { setFormHandlers, onChangeImageInput } from './upload-photo.js'; // импорт функции загрузки изображения
import { pristineValidateComment, pristineValidateHashtags } from './validation-form.js'; // импорт данных валидации полей ввода формы
import { onChangeEffectStyle } from './add-effects.js'; // импорт данных для работы слайдера

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

/* фильтры изображений */
const imgFilters = document.querySelector('.img-filters'); // блок с фильтрами
const imgFiltersForm = imgFilters.querySelector('.img-filters__form'); // форма
const FilterButtons = imgFiltersForm.children; // все кнопки формы
// const filterDefault = imgFiltersForm.querySelector('#filter-default'); // кнопка по-умолчанию
// const filterRandom = imgFiltersForm.querySelector('#filter-random'); // кнопка рандома
// const filterDiscussed = imgFiltersForm.querySelector('#filter-discussed'); // кнопка обсуждаемых
const picturesList = document.querySelector('.pictures'); // список с фотографиями
// const picturesListItems = picturesList.children;
let picturesListItemsAll = picturesList.querySelectorAll('.picture');

if(photosArray) {
  imgFilters.classList.remove('img-filters--inactive');
}

/* функция удаления изображений */
const removePictures = () => {
  picturesListItemsAll = picturesList.querySelectorAll('.picture');
  picturesListItemsAll.forEach((picturesListItem) => {
    if (picturesListItem.classList.contains('picture')) {
      picturesListItem.remove();
    }
  });
};

/* функция выбора фильтра */
const checkFilter = (evt) => {
  const checkedFilter = evt.target;
  for (const element of FilterButtons) {
    element.classList.remove('img-filters__button--active');
  }
  checkedFilter.classList.add('img-filters__button--active');

  const randomArray1 = [photosArray[0], photosArray[1],photosArray[2],photosArray[3]];
  const randomArray2 = [photosArray[21], photosArray[22],photosArray[23],photosArray[24]];
  switch (checkedFilter.id) {
    case 'filter-default':
      removePictures();
      createPictures(photosArray);

      break;
    case 'filter-random':
      removePictures();
      createPictures(randomArray1);

      break;
    case 'filter-discussed':
      removePictures();
      createPictures(randomArray2);

      break;
  }
};

imgFiltersForm.addEventListener('click', checkFilter);

