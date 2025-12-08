import { getArrayNIds } from './utils.js';
import { createPictures } from './create-pictures.js';

/* фильтры изображений */
const imgFilters = document.querySelector('.img-filters'); // блок с фильтрами
const imgFiltersForm = imgFilters.querySelector('.img-filters__form'); // форма
const FilterButtons = imgFiltersForm.children; // все кнопки формы
const picturesList = document.querySelector('.pictures'); // список с фотографиями
let picturesListItemsAll = picturesList.querySelectorAll('.picture');

/* функция показа фильтров */
const showFilterButtons = (condition) => {
  if(condition) {
    imgFilters.classList.remove('img-filters--inactive');
  }
};

/* функция сортировки массива по убыванию */
const comparePictureLikes = (elementA, elementB) => elementB.likes - elementA.likes;

/* функция удаления изображений */
const removePictures = () => {
  picturesListItemsAll = picturesList.querySelectorAll('.picture');
  picturesListItemsAll.forEach((picturesListItem) => {
    if (picturesListItem.classList.contains('picture')) {
      picturesListItem.remove();
    }
  });
};

/* */
const randomiser = (n, start, array) => {
  const nIdsArray = getArrayNIds(n, start, array.length - 1);
  const randomArray = [];
  nIdsArray.forEach((elem) => {
    randomArray.push(array[elem]);
  });
  return randomArray;
};

/* функция перерисовки фильтрованных фото */
const rerender = (array) => {
  removePictures(); // стираем все фото
  createPictures(array); // отрисовываем новые
};

/* функция выбора фильтра */
const checkFilter = (array) => (evt) => {
  const checkedFilter = evt.target; // определяем по какой кнопке кликнули
  for (const element of FilterButtons) { // убираем у всех кнопок активный стиль
    element.classList.remove('img-filters__button--active');
  }
  checkedFilter.classList.add('img-filters__button--active'); // вешаем на выбранную кнопку активный стиль
  let randomArray = []; // массив для 10 случайных фото
  const sortedArray = array.slice().sort(comparePictureLikes); // сортированный по лайкам массив

  switch (checkedFilter.id) { // выбираем какой массив отрисовать
    case 'filter-default':
      rerender(array);
      break;
    case 'filter-random':
      randomArray = randomiser(10, 0, array); // отбираем случайные фото
      rerender(randomArray);
      break;
    case 'filter-discussed':
      rerender(sortedArray);
      break;
  }
};

/* функция-обработчик выбора фильтра */ // перенос
// const onChangeFilter = checkFilter(photosArray);
/* функция установки обработчика на выбор фильтра */ // перенос и экспорт
// const setFilterChange = () => imgFiltersForm.addEventListener('click', throttle(onChangeFilter, 500)); // (1)

export { showFilterButtons, checkFilter, /*setFilterChange*/ };
