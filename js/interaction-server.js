import { pristine } from './validation-form';

const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success'); // шаблон сообщения об успешной загрузке
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error'); // шаблон сообщения о неуспешной загрузке

/* функция показа сообщения при отправке данных */
const showMessage = (result) => {
  let resultMessage; // элемент с сообщением о результате
  if (result === 'success') {
    resultMessage = successMessageTemplate.cloneNode(true);
  }
  if (result === 'error') {
    resultMessage = errorMessageTemplate.cloneNode(true);
  }
  resultMessage.classList.add('result-message');
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
  const resultMessage = document.querySelector('.result-message');
  if (evt.key === 'Escape') {
    removeListeners();
    resultMessage.remove();
  }
}

/* функция закрытия сообщения по клику на кнопке */
function onButtonCloseMessage (element) {
  removeListeners();
  element.remove();
}

/* функция закрытия окна по клику на остальной части окна */
function onWindowClick (evt) {
  const resultMessage = document.querySelector('.result-message');
  if (resultMessage) {
    const resultMessageInner = resultMessage.querySelector('div'); // окно с сообщением об успехе
    const isResultMessage = evt.composedPath().includes(resultMessageInner); // проверка, что клик не в окне
    if (!isResultMessage) {
      removeListeners();
      resultMessage.remove();
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
