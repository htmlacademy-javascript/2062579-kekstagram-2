import { pristine } from './validation-form';

const SERVER_ADDRESS = {
  SET: 'https://31.javascript.htmlacademy.pro/kekstagram',
  GET: 'https://31.javascript.htmlacademy.pro/kekstagram/data'
};
const ERROR_MESSAGE_TIMEOUT = 5000; // время показа сообщения об ошибке загрузки данных
const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success'); // шаблон сообщения об успешной отправке фото
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error'); // шаблон сообщения о неуспешной отправке фото
const errorGetMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error'); // шаблон сообщения о неуспешной загрузке данных

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
  resultButton.addEventListener('click', () => onButtonCloseMessage(resultMessage));
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
const setFormData = (submitForm) => (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate(); // валидация полей формы

  if (isValid) {
    const formData = new FormData(evt.target); // собираем данные из формы

    fetch(SERVER_ADDRESS.SET,
      {
        method: 'POST',
        body: formData
      }
    )
      .then( // при успешной отправке
        () => {
          submitForm(); // закрываем форму
          showSetMessage('success');
        }
      )
      .catch( // при не успешной отправке
        () => {
          showSetMessage('error');
        }
      );
  }
};

/* функция получения данных с сервера */
const getServerData = async () => {
  let responce;
  try {
    responce = await fetch(SERVER_ADDRESS.GET);
    if (!responce.ok) {
      showGetMessage();
    }
  } catch {
    showGetMessage();
  }
  const serverData = await responce.json();
  return serverData;
};

/* загружаем данные с сервера */
const photosArray = await getServerData();

export { setFormData, photosArray };
