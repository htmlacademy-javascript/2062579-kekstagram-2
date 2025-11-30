// import { closeUploadForm } from './upload-photo'; // импорт функции закрытия окна
import { pristine } from './validation-form';

const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success'); // шаблон сообщения об успешной загрузке
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error'); // шаблон сообщения о неуспешной загрузке

/* функция показа сообщения при отправке данных */
let resultMessage; // элемент с сообщением о результате
const showMessage = (result) => {
  if (result === 'success') {
    resultMessage = successMessageTemplate.cloneNode(true);
  }
  if (result === 'error') {
    resultMessage = errorMessageTemplate.cloneNode(true);
  }
  const resultButton = resultMessage.querySelector(`.${result}__button`);
  resultButton.addEventListener('click', () => onButtonCloseMessage(resultMessage));
  document.addEventListener('keydown', onEscapeDown);
  document.addEventListener('click', onWindowClick);
  return body.append(resultMessage);
};

/* функция удаления обработчиков в сообщениях об успехе/ошибке */
const removeListeners = () => {
  document.removeEventListener('keydown', onEscapeDown);
  document.removeEventListener('click', onWindowClick);
};

/* функция закрытия сообщения по эскейпу */
function onEscapeDown (evt) {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');
  if (evt.key === 'Escape' && successMessage) {
    removeListeners();
    successMessage.remove();
  }
  if (evt.key === 'Escape' && errorMessage) {
    removeListeners();
    errorMessage.remove();
  }
}

/* функция закрытия сообщения по клику на кнопке */
function onButtonCloseMessage (element) {
  removeListeners();
  element.remove();
}

/* функция закрытия окна по клику на остальной части окна */
function onWindowClick (evt) {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');
  if (successMessage) {
    const successMessageInner = successMessage.querySelector('.success__inner'); // окно с сообщением об успехе
    const isSuccessMessage = evt.composedPath().includes(successMessageInner); // проверка, что клик не в окне
    if (!isSuccessMessage) {
      removeListeners();
      successMessage.remove();
    }
  } else if (errorMessage) {
    const errorMessageInner = errorMessage.querySelector('.error__inner'); // окно с сообщением об ошибке
    const isErrorMessage = evt.composedPath().includes(errorMessageInner); // проверка, что клик не в окне
    if (!isErrorMessage) {
      removeListeners();
      errorMessage.remove();
    }
  }
}

/* функция отправки данных на сервер */
const setFormData = (closeForm) => (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate(); // валидация полей формы

  if (isValid) {
    const formData = new FormData(evt.target); // собираем данные из формы

    fetch('https://31.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData
      }
    )
      .then( // при успешной отправке
        () => {
          closeForm(); // закрываем форму
          showMessage('success');
        }
      )
      .catch( // при не успешной отправке
        () => {
          showMessage('error');
        }
      );
  }
};

/* функция получения данных с сервера */
const getServerData = async () => {
  const responce = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
  const serverData = await responce.json();

  return serverData;
};

export { setFormData, getServerData };
