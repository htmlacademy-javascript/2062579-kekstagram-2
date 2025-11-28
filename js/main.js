import { createPhotosArray } from './create-photos-array.js'; // импорт функции, генерирующей моковые данные
import { createPictures } from './create-pictures.js'; // импорт функции, отрисовывающей изображения на странице
import { picturesContainer, openBigPicture } from './create-big-picture.js'; // импорт функций открытия/закрытия большого изображения

const photosArray = createPhotosArray(); // формируем объект с моковыми данными
createPictures(photosArray); // отрисовываем изображения
picturesContainer.addEventListener('click', (evt) => openBigPicture(evt, photosArray)); // открываем большое фото
