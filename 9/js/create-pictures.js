import {createDescriptionsArray} from './create-data.js';

// нахожу контейнер для изображений
const picturesListElement = document.querySelector('.pictures');

// нахожу шаблон
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

// подключаю импортированную функцию
const picturesDescriptionsArray = createDescriptionsArray();

// создаю фрагмент, через который буду подключать массив с изображениями
const picturesArrayFragment = document.createDocumentFragment();

// создаю фрагмент с изображениями
picturesDescriptionsArray.forEach(({id, url, description, likes, comments}) => {
// клонирую шаблон и помещаю в контейнер
  const picture = pictureTemplateElement.cloneNode(true);
  // прописываю данные изображений
  picture.dataset.pictureId = id;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  // загружаю изображение во фрагмент
  picturesArrayFragment.appendChild(picture);
});

// загружаю фрагмент в контейнер для изображений
picturesListElement.appendChild(picturesArrayFragment);
// экспортирую результат
export {picturesListElement, picturesDescriptionsArray};

