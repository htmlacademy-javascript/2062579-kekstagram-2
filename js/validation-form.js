const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_NUMBER = 5;
const uploadImageForm = document.querySelector('.img-upload__form'); // форма загрузки фото
const commentField = uploadImageForm.querySelector('.text__description'); // поле ввода комментария
const hashtagsField = uploadImageForm.querySelector('.text__hashtags'); // поле ввода хэштэгов
const hashtagRules = /^#[a-zа-яё0-9]{1,19}$/i; // регулярное выражение для валидации хэштэга

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
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
        errorHashtagMessage = 'Хэштэг должен начинаться с #';
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
    const unicHashTags = new Set(hashtagsFieldValues);
    if (unicHashTags.size !== hashtagsFieldValues.length) {
      errorHashtagMessage = 'Хэштеги не должны повторяться';
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
    const unicHashTags = new Set(hashtagsFieldValues);
    if (unicHashTags.size !== hashtagsFieldValues.length) {
      result = false;
    }
  }
  return result;
};

const pristineValidateComment = () => pristine.addValidator(commentField, validateComment, `Не более ${MAX_COMMENT_LENGTH} символов`); // проверка комментария
const pristineValidateHashtags = () => pristine.addValidator(hashtagsField, validateHashTagRules, createErrorHashtagMessage); // проверка хэштэгов

export { pristine, pristineValidateComment, pristineValidateHashtags };
