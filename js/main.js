import { showErrorMessage, getUnicRandomIds } from './utils.js'; // импорт функции вызова сообщения об ошибке
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

/* функция сортировки массива по убыванию */
const comparePictureLikes = (elementA, elementB) => elementB.likes - elementA.likes;

/* функция получения заданного числа уникальных ID из диапазона */
const getArrayNIds = (n, a, b) => {
  const arrayNIds = [];
  const getUnicRandomPictureIds = getUnicRandomIds(a, b);
  for (let i = 0; i < n; i++) {
    const newId = getUnicRandomPictureIds();
    arrayNIds.push(newId);
  }
  return arrayNIds;
};

const randomiser = () => {
  const nIdsArray = getArrayNIds(10, 0, photosArray.length - 1);
  const randomArray = [];
  nIdsArray.forEach((elem) => {
    randomArray.push(photosArray[elem]);
  });
  return randomArray;
};

/* функция выбора фильтра */
const checkFilter = (evt) => {
  const checkedFilter = evt.target;
  for (const element of FilterButtons) {
    element.classList.remove('img-filters__button--active');
  }
  checkedFilter.classList.add('img-filters__button--active');
  let randomArray1 = [];
  const randomArray2 = photosArray.slice().sort(comparePictureLikes);
  switch (checkedFilter.id) {
    case 'filter-default':
      removePictures();
      createPictures(photosArray);
      break;
    case 'filter-random':
      randomArray1 = randomiser();
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

