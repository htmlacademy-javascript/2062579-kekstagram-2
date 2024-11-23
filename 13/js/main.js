import './control-slider-effects.js';
import {renderFullPicture} from './show-full-picture.js';
import './control-scale-picture.js';
import './upload-picture-form.js';
import {getServerData, showErrorMessage} from './communication-server.js';
import {configFilter} from './filters.js';
import {createPicturesArray} from './create-pictures.js';

// функция получения данных с сервера, запуска и обработки ошибки
const bootstrap = async () => {
  try {
    const photosArray = await getServerData();
    createPicturesArray(photosArray);
    configFilter(photosArray);
    renderFullPicture(photosArray);
  } catch (error) {
    showErrorMessage();
  }
};
// запускаю работу
bootstrap();
