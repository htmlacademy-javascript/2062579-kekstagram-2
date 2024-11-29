// допустимое число символов в комментарии
const HASHTAG_LENGTH = 140;
// форма загрузки изображения
const pictureUploadFormElement = document.querySelector('.img-upload__form');
// // поле ввода комментария
const textCommentElement = pictureUploadFormElement.querySelector('.text__description');
// содержание комментария
let textCommentValue = '';
// сообщение об ошибке
const errorTextMessage = 'Длина комментария не более 140 символов';

const setErrorCommentMessage = () => errorTextMessage;
// функция проверки длины комментария
const validateCommentLength = () => HASHTAG_LENGTH >= textCommentValue.length;

// получаю содержимое textarea
textCommentElement.addEventListener('input', () => {
  textCommentValue = textCommentElement.value;
});
// экспортирую
export {validateCommentLength, setErrorCommentMessage};
