import { createPictures } from './create-pictures.js';
import { debounce, getSetIds } from './utils.js'; // импорт функции вызова сообщения об ошибке

const RANDOM_INDEX_PARAMETERS = {
  NUMBERS: 10,
  FIRST_INDEX: 0
};
const imgFilters = document.querySelector('.img-filters'); // блок с фильтрами
const imgFiltersForm = imgFilters.querySelector('.img-filters__form'); // форма
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
const selectRandomIndexes = (number, start, data) => {
  const setIds = getSetIds(number, start, data.length - 1);
  const randomIds = [];
  setIds.forEach((elem) => {
    randomIds.push(data[elem]);
  });
  return randomIds;
};

/* функция удаления изображений */
const removePictures = () => {
  picturesListItemsAll = picturesList.querySelectorAll('.picture');
  picturesListItemsAll.forEach((picturesListItem) => {
    picturesListItem.remove();
  });
};

/* функция перерисовки фильтрованных фото */
const reRenderPictures = (data) => {
  removePictures(); // стираем все фото
  createPictures(data); // отрисовываем новые
};

/* функция изменения стиля выбранного фильтра */
const changeStyleFilterButtons = (checked) => {
  const lastActiveFilter = imgFiltersForm.querySelector('.img-filters__button--active'); // находим кнопку предыдущего активного фильтра
  lastActiveFilter.classList.remove('img-filters__button--active'); // убираем у нее активный стиль
  checked.classList.add('img-filters__button--active'); // вешаем на выбранную кнопку активный стиль
};

/* функция отрисовки фото при применении фильтра */
const renderFilteredPictures = (checked, pictures) => {
  let randomPictures = []; // массив для 10 случайных фото
  const sortedPictures = pictures.toSorted(comparePictureLikes); // сортированный по лайкам массив

  switch (checked.id) { // выбираем какой массив отрисовать
    case 'filter-default':
      reRenderPictures(pictures);
      break;
    case 'filter-random':
      randomPictures = selectRandomIndexes(RANDOM_INDEX_PARAMETERS.NUMBERS, RANDOM_INDEX_PARAMETERS.FIRST_INDEX, pictures); // отбираем случайные фото
      reRenderPictures(randomPictures);
      break;
    case 'filter-discussed':
      reRenderPictures(sortedPictures);
      break;
  }
};

/* задержка времени при отрисовке фото */
const setThrottleRerender = debounce(renderFilteredPictures);

/* функция выбора фильтра */
const checkFilter = (data) => (evt) => {
  const checkedFilter = evt.target; // определяем по какой кнопке кликнули
  if (checkedFilter.classList.contains('img-filters__button')) { // проверяем, что кликнули именно по кнопке
    if (!checkedFilter.classList.contains('img-filters__button--active') || checkedFilter.id === 'filter-random') { // для активного фильтра не проводим перерисовку при повторных нажатиях, но для рандомного фильтра перерисовываем всегда
      changeStyleFilterButtons(checkedFilter); // меняем стили кнопок фильтров
      setThrottleRerender(checkedFilter, data); // применяем фильтр к фото
    }
  }
};

export { showFilterButtons, checkFilter };
