import {createDescriptionsArray} from './create-data.js';

// нахожу контейнер для изображений
const picturesArray = document.querySelector('.pictures');

// нахожу шаблон
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// подключаю импортированную функцию
const picturesDescriptionsArray = createDescriptionsArray();

// создаю фрагмент, через который буду подключать массив с изображениями
const picturesArrayFragment = document.createDocumentFragment();

// создаю фрагмент с изображениями
picturesDescriptionsArray.forEach(({url, description, likes, comments}) => {
// клонирую шаблон и помещаю в контейнер
  const picture = pictureTemplate.cloneNode(true);
  // прописываю данные изображений
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  // загружаю изображение во фрагмент
  picturesArrayFragment.appendChild(picture);
});

// загружаю фрагмент в контейнер для изображений
picturesArray.appendChild(picturesArrayFragment);
