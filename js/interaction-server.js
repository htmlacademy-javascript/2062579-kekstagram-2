import { pristine } from './validation-form';
import { uploadDataServer } from './api.js';

const ERROR_MESSAGE_TIMEOUT = 5000; // время показа сообщения об ошибке загрузки данных
const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success'); // шаблон сообщения об успешной отправке фото
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error'); // шаблон сообщения о неуспешной отправке фото
const errorGetMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error'); // шаблон сообщения о неуспешной загрузке данных
const uploadSubmitButton = document.querySelector('.img-upload__submit'); // кнопка отправки формы

/* функция закрытия окна сообщения с результатом отправки формы */
const closeResultMessage = (element) => {
  document.removeEventListener('keydown', onEscapeDown);
  document.removeEventListener('click', onWindowClick);
  element.remove();
};

/* функция показа сообщения при отправке данных */
const showSetMessage = (result) => {
  let resultMessage; // элемент с сообщением о результате
  if (result === 'success') {
    resultMessage = successMessageTemplate.cloneNode(true);
  }
  if (result === 'error') {
    resultMessage = errorMessageTemplate.cloneNode(true);
  }
  resultMessage.classList.add('result-message');
  const resultButton = resultMessage.querySelector(`.${result}__button`);
  resultButton.addEventListener('click', () => closeResultMessage(resultMessage));
  document.addEventListener('keydown', onEscapeDown);
  document.addEventListener('click', onWindowClick);
  return body.append(resultMessage);
};

/* функция показа сообщения при загрузке данных */
const showGetMessage = () => {
  const resultMessage = errorGetMessageTemplate.cloneNode(true);

  setTimeout(() => { // установка удаления сообщения
    resultMessage.remove();
  }, ERROR_MESSAGE_TIMEOUT);

  return body.append(resultMessage);
};

/* функция закрытия сообщения по эскейпу */
function onEscapeDown (evt) {
  const resultMessage = document.querySelector('.result-message');
  if (evt.key === 'Escape') {
    closeResultMessage(resultMessage);
  }
}

/* функция закрытия окна по клику на остальной части окна */
function onWindowClick (evt) {
  const resultMessage = document.querySelector('.result-message');
  if (resultMessage) {
    const resultMessageInner = resultMessage.querySelector('div'); // окно с сообщением об успехе
    const isResultMessage = evt.composedPath().includes(resultMessageInner); // проверка, что клик не в окне
    if (!isResultMessage) {
      closeResultMessage(resultMessage);
    }
  }
}

/* функция блокировки кнопки отправки формы */
const disableSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикуется';
};
/* функция разблокировки кнопки отправки формы */
const unDisableSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

/* функция отправки данных на сервер */
const setFormData = (submitForm) => (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate(); // валидация полей формы

  if (isValid) {
    disableSubmitButton(); // блокируем кнопку
    const formData = new FormData(evt.target); // собираем данные из формы

    uploadDataServer(formData)
      .then( // при успешной отправке
        (responce) => {
          if (!responce.ok) {
            throw new Error;
          }
          submitForm(); // закрываем форму
          showSetMessage('success');
        }
      )
      .catch( // при не успешной отправке
        () => {
          showSetMessage('error');
        }
      )
      .finally(
        () => {
          unDisableSubmitButton(); // разблокируем кнопку
        }
      );
  }
};

export { setFormData, showGetMessage };
