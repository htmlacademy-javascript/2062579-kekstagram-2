// форма загрузки изображения
const pictureUploadFormElement = document.querySelector('.img-upload__form');
// допустимое число символов в комментарии
const HASHTAG_LENGTH = 140;
// // поле ввода комментария
const textCommentElement = pictureUploadFormElement.querySelector('.text__description');
// содержание комментария
let textCommentValue = '';
// сообщение об ошибке
const errorCommentMessage = 'Длина комментария не более 140 символов';
// функция проверки длины комментария
const validateCommentLength = () => HASHTAG_LENGTH >= textCommentValue.length;

// получаю содержимое textarea
textCommentElement.addEventListener('input', () => {
  textCommentValue = textCommentElement.value;
});
// экспортирую
export {validateCommentLength, errorCommentMessage};
