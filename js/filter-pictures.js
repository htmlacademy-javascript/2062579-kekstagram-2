import { createPictures } from './create-pictures.js';
import { debounce, getArrayNIds } from './utils.js'; // импорт функции вызова сообщения об ошибке

const RANDOM_INDEX_PARAMETERS = {
  NUMBERS: 10,
  FIRST_INDEX: 0
};
const imgFilters = document.querySelector('.img-filters'); // блок с фильтрами
const imgFiltersForm = imgFilters.querySelector('.img-filters__form'); // форма
const filterButtons = imgFiltersForm.children; // все кнопки формы
const picturesList = document.querySelector('.pictures'); // список с фотографиями
let picturesListItemsAll = picturesList.querySelectorAll('.picture');

/* функция показа фильтров */
const showFilterButtons = (condition) => {
  if(condition) {
    imgFilters.classList.remove('img-filters--inactive');
  }
};

/* функция сортировки массива по убыванию */
const comparePictureLikes = (elementA, elementB) => elementB.comments.length - elementA.comments.length;

/* функция отбора N-случайных элементов из массива */
const selectRandomIndexArray = (n, start, array) => {
  const nIdsArray = getArrayNIds(n, start, array.length - 1);
  const randomArray = [];
  nIdsArray.forEach((elem) => {
    randomArray.push(array[elem]);
  });
  return randomArray;
};

/* функция удаления изображений */
const removePictures = () => {
  picturesListItemsAll = picturesList.querySelectorAll('.picture');
  picturesListItemsAll.forEach((picturesListItem) => {
    if (picturesListItem.classList.contains('picture')) {
      picturesListItem.remove();
    }
  });
};

/* функция перерисовки фильтрованных фото */
const rerenderPictures = (array) => {
  removePictures(); // стираем все фото
  createPictures(array); // отрисовываем новые
};

/* функция изменения стиля выбранного фильтра */
const changeStyleFilterButtons = (checked) => {
  for (const element of filterButtons) { // убираем у всех кнопок активный стиль
    element.classList.remove('img-filters__button--active');
  }
  checked.classList.add('img-filters__button--active'); // вешаем на выбранную кнопку активный стиль
};

/* функция отрисовки фото при применении фильтра */
const renderFilteredPictures = (checked, array) => {
  let randomArray = []; // массив для 10 случайных фото
  const sortedArray = array.slice().sort(comparePictureLikes); // сортированный по лайкам массив

  switch (checked.id) { // выбираем какой массив отрисовать
    case 'filter-default':
      rerenderPictures(array);
      break;
    case 'filter-random':
      randomArray = selectRandomIndexArray(RANDOM_INDEX_PARAMETERS.NUMBERS, RANDOM_INDEX_PARAMETERS.FIRST_INDEX, array); // отбираем случайные фото
      rerenderPictures(randomArray);
      break;
    case 'filter-discussed':
      rerenderPictures(sortedArray);
      break;
  }
};

/* задержка времени при отрисовке фото */
const throttleRerender = debounce(renderFilteredPictures);

/* функция выбора фильтра */
const checkFilter = (array) => (evt) => {
  const checkedFilter = evt.target; // определяем по какой кнопке кликнули
  changeStyleFilterButtons(checkedFilter); // меняем стили кнопок фильтров
  throttleRerender(checkedFilter, array); // применяем фильтр к фото
};

export { showFilterButtons, checkFilter };
