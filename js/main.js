import { showErrorMessage, getUnicRandomIds, debounce } from './utils.js'; // импорт функции вызова сообщения об ошибке
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

/* фильтры изображений */ // перенос
const imgFilters = document.querySelector('.img-filters'); // блок с фильтрами
const imgFiltersForm = imgFilters.querySelector('.img-filters__form'); // форма
const FilterButtons = imgFiltersForm.children; // все кнопки формы
const picturesList = document.querySelector('.pictures'); // список с фотографиями
let picturesListItemsAll = picturesList.querySelectorAll('.picture');

/* функция показа фильтров */ // перенос и экспорт
const showFilterButtons = (condition) => {
  if(condition) {
    imgFilters.classList.remove('img-filters--inactive');
  }
};
/* показываем фильтры */ // остается, импорт
showFilterButtons(photosArray);

/* функция удаления изображений */ // перенос
const removePictures = () => {
  picturesListItemsAll = picturesList.querySelectorAll('.picture');
  picturesListItemsAll.forEach((picturesListItem) => {
    if (picturesListItem.classList.contains('picture')) {
      picturesListItem.remove();
    }
  });
};

/* функция сортировки массива по убыванию */ // перенос в utils и экспорт
const comparePictureLikes = (elementA, elementB) => elementB.likes - elementA.likes;

/* функция получения заданного числа уникальных ID из диапазона */ // перенос в utils и экспорт
const getArrayNIds = (n, a, b) => {
  const arrayNIds = [];
  const getUnicRandomPictureIds = getUnicRandomIds(a, b);
  for (let i = 0; i < n; i++) {
    const newId = getUnicRandomPictureIds();
    arrayNIds.push(newId);
  }
  return arrayNIds;
};

/* */ // перенос
const randomiser = (n, start, array) => {
  const nIdsArray = getArrayNIds(n, start, array.length - 1);
  const randomArray = [];
  nIdsArray.forEach((elem) => {
    randomArray.push(array[elem]);
  });
  return randomArray;
};

/* функция выбора фильтра */ // перенос и экспорт
// const checkFilter = (evt) => {
//   const checkedFilter = evt.target; // определяем по какой кнопке кликнули
//   for (const element of FilterButtons) { // убираем у всех кнопок активный стиль
//     element.classList.remove('img-filters__button--active');
//   }
//   checkedFilter.classList.add('img-filters__button--active'); // вешаем на выбранную кнопку активный стиль
//   let randomArray1 = []; // массив для 10 случайных фото
//   const randomArray2 = photosArray.slice().sort(comparePictureLikes); // сортированный по лайкам массив
//   switch (checkedFilter.id) { // выбираем какой массив отрисовать
//     case 'filter-default':
//       removePictures(); // стираем все фото
//       createPictures(photosArray); // отрисовываем новые
//       break;
//     case 'filter-random':
//       randomArray1 = randomiser(10, 0, photosArray.length - 1); // отбираем случайные фото
//       removePictures();
//       createPictures(randomArray1);
//       break;
//     case 'filter-discussed':
//       removePictures();
//       createPictures(randomArray2);
//       break;
//   }
// };
/* функция выбора фильтра */ // перенос
const checkFilter = (array) => (evt) => {
  const checkedFilter = evt.target; // определяем по какой кнопке кликнули
  for (const element of FilterButtons) { // убираем у всех кнопок активный стиль
    element.classList.remove('img-filters__button--active');
  }
  checkedFilter.classList.add('img-filters__button--active'); // вешаем на выбранную кнопку активный стиль
  let randomArray1 = []; // массив для 10 случайных фото
  const randomArray2 = array.slice().sort(comparePictureLikes); // сортированный по лайкам массив
  switch (checkedFilter.id) { // выбираем какой массив отрисовать
    case 'filter-default':
      removePictures(); // стираем все фото
      createPictures(array); // отрисовываем новые
      break;
    case 'filter-random':
      randomArray1 = randomiser(10, 0, array); // отбираем случайные фото
      removePictures();
      createPictures(randomArray1);
      break;
    case 'filter-discussed':
      removePictures();
      createPictures(randomArray2);
      break;
  }
};
/* функция-обработчик выбора фильтра */ // перенос
const onChangeFilter = checkFilter(photosArray);

/* функция установки обработчика на выбор фильтра */ // перенос и экспорт
// imgFiltersForm.addEventListener('click', checkFilter); // (1)
const setFilterChange = () => imgFiltersForm.addEventListener('click', onChangeFilter); // (1)

/* установка обработчика на выбор фильтра */ // остается и импорт
setFilterChange();
