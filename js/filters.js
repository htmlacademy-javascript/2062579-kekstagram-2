import {debounce} from './utilities.js';
import {createPicturesArray} from './create-pictures.js';

// класс для активного фильтра
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
// количество фото, отбираемых в случайном фильтре
const RANDOM_PHOTOS_COUNT = 10;
// набор фильтров
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
// нахожу элемент с фильтрами
const filtersElement = document.querySelector('.img-filters');
// переменная для текущего фильтра
let currentFilter = Filters.DEFAULT;
let photos = [];
// "устранитель дребезга"
const debounceRender = debounce(createPicturesArray);

// функция применения фильтров
const appllyFilter = () => {
  let filteredPhotos = [];
  // фильтр по умолчанию
  if(currentFilter === Filters.DEFAULT) {
    filteredPhotos = photos;
  }
  // фильтр случайных фото
  if(currentFilter === Filters.RANDOM) {
    filteredPhotos = photos.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_COUNT);
  }
  // фильтр обсуждаемых фото
  if(currentFilter === Filters.DISCUSSED) {
    filteredPhotos = photos.toSorted((a,b) => b.comments.length - a.comments.length);
  }
  debounceRender(filteredPhotos);
};

const onFiltersClick = (evt) => {
  // фильтр, который выбирается кликом
  const targetFilter = evt.target;
  // активный фильтр
  const activeFilter = document.querySelector(`.${ACTIVE_FILTER_CLASS}`);
  // проверки, куда был клик
  if(!targetFilter.matches('button')) {
    return; // если клик не в кнопку фильтра, ничего не делается
  }
  if(activeFilter === targetFilter) {
    return; // если клик по активному, ничего не делается
  }
  // если клик в неактивный фильтр, переключаю класс с активного на выбранный
  activeFilter.classList.toggle(ACTIVE_FILTER_CLASS);
  targetFilter.classList.toggle(ACTIVE_FILTER_CLASS);
  currentFilter = targetFilter.getAttribute('id');
  // запускаю применение фильтров
  appllyFilter();
};

const makeFilter = (photosData) => {
  // отображаю блок фильтров на странице
  filtersElement.classList.remove('img-filters--inactive');
  // подписываю блок на клики
  filtersElement.addEventListener('click', onFiltersClick);
  // записываю в массив photos полученные с сервера данные
  photos = photosData;
};
// экспортирую
export {makeFilter};
