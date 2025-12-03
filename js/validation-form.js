const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_NUMBER = 5;
const uploadImageForm = document.querySelector('.img-upload__form'); // форма загрузки фото
const commentField = uploadImageForm.querySelector('.text__description'); // поле ввода комментария
const hashtagsField = uploadImageForm.querySelector('.text__hashtags'); // поле ввода хэштэгов
const hashtagRules = /^#[a-zа-яё0-9]{1,19}$/i; // регулярное выражение для валидации хэштэга

const pristine = new Pristine(uploadImageForm, {
  // class of the parent element where the error/success class is added
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  // class of the parent element where error text element is appended
  errorTextParent: 'img-upload__field-wrapper'
});

/* проверка длины комментария */
const validateComment = () => commentField.value.length <= MAX_COMMENT_LENGTH;

/* проверка хэштэгов */
let hashtagsFieldValues = []; // содержимое поля ввода хэштэгов

let errorHashtagMessage = ''; // сообщение об ошибке

const createErrorHashtagMessage = () => { // функция создания комментария об ошибке
  hashtagsFieldValues = hashtagsField.value.trim().split(/\s+/); // разбиваем введенные в поле символы на отдельные хэштэги

  for (const hashtagsFieldValue of hashtagsFieldValues) {
    if (!hashtagRules.test(hashtagsFieldValue)) { // если не прошла валидация хэштэга, то
      if (hashtagsFieldValue[0] !== '#') {
        errorHashtagMessage = 'Хэштэг начинается с #';
      } else if (hashtagsFieldValue.length === 1) {
        errorHashtagMessage = 'Хэштэг не может быть из одной #';
      } else if (hashtagsFieldValue.length > 20) {
        errorHashtagMessage = 'Хэштэг не более 20 символов';
      } else {
        errorHashtagMessage = 'В хэштэге должны быть только буквы и цифры';
      }
    }
  }
  if (hashtagsFieldValues.length > MAX_HASHTAG_NUMBER) { // проверка количества хэштэгов
    errorHashtagMessage = 'Не больше пяти хэштэгов';
  }
  if (hashtagsFieldValues.length > 1) { // проверка на повторение хэштэгов, если их больше одного
    for (let i = 0; i < hashtagsFieldValues.length - 1; i++) {
      const compareHashTag = hashtagsFieldValues[i];
      for (let j = i + 1; j < hashtagsFieldValues.length; j++) {
        if (compareHashTag === hashtagsFieldValues[j]) {
          errorHashtagMessage = 'Хэштеги не должны повторяться';
          break;
        }
      }
    }
  }
  return errorHashtagMessage;
};

const validateHashTagRules = () => {
  hashtagsFieldValues = hashtagsField.value.trim().split(/\s+/); // разбиваем введенные в поле символы на отдельные хэштэги
  let result = true;

  if (hashtagsField.value === '') { // хэштэг не обязателен
    return result;
  }
  for (const hashtagsFieldValue of hashtagsFieldValues) { // цикл проверки каждого хэштэга
    if (!hashtagRules.test(hashtagsFieldValue)) {
      result = false;
      return result;
    }
  }
  if (hashtagsFieldValues.length > MAX_HASHTAG_NUMBER) { // проверка на макс. кол-во хэштэгов
    result = false;
  }
  if (hashtagsFieldValues.length > 1) { // проверка на повторение хэштегов
    for (let i = 0; i < hashtagsFieldValues.length - 1; i++) {
      const compareHashTag = hashtagsFieldValues[i];
      for (let j = i + 1; j < hashtagsFieldValues.length; j++) {
        if (compareHashTag === hashtagsFieldValues[j]) {
          result = false;
        }
      }
    }
  }
  return result;
};

const validateUploadPhotoForm = (evt) => { // валидация формы
  evt.preventDefault();
  pristine.validate();
};

export { MAX_COMMENT_LENGTH, pristine, validateComment, createErrorHashtagMessage, validateHashTagRules, validateUploadPhotoForm };
