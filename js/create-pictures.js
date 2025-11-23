const picturesList = document.querySelector('.pictures'); // список с фотографиями
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // шаблон для фото
const picturesFragment = document.createDocumentFragment(); // фрагмент

export const createPictures = (datasArray) => {
  datasArray.forEach(({id, url, description, likes, comments}) => {
    const picturesListItem = pictureTemplate.cloneNode(true);
    const image = picturesListItem.querySelector('.picture__img');
    image.src = url;
    image.alt = description;
    image.dataset.id = id;
    const likesNumber = picturesListItem.querySelector('.picture__likes');
    likesNumber.textContent = likes;
    const commentsNumber = picturesListItem.querySelector('.picture__comments');
    commentsNumber.textContent = comments.length;
    picturesFragment.append(picturesListItem);
  });

  return picturesList.append(picturesFragment);
};
