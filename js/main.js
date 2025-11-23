import { createPhotosArray } from './create-photos-array.js'; // импорт функции, генерирующей моковые данные
import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице

const photosArray = createPhotosArray();
createPictures(photosArray);
