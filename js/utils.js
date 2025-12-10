const ERROR_MESSAGE_TIMEOUT = 5000; // время показа сообщения об ошибке загрузки данных
const TIMEOUT_DELAY = 500; // задержка времени для троттлинга и дебаунса
const body = document.querySelector('body');
const errorGetMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error'); // шаблон сообщения о неуспешной загрузке данных

/* функция получения случайного числа в диапазоне от А до В */
const getRandomNumber = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* функция показа сообщения при ошибке */
const showErrorMessage = (text, timeOut = ERROR_MESSAGE_TIMEOUT) => {
  const resultMessage = errorGetMessageTemplate.cloneNode(true);
  const resultMessageTitle = resultMessage.querySelector('.data-error__title'); // заголовок сообщения об ошибке
  if (text) { // если передан параметр с текстом, то меняем текст
    resultMessageTitle.textContent = text;
  }
  setTimeout(() => { // установка времени показа сообщения
    resultMessage.remove();
  }, timeOut);

  return body.append(resultMessage);
};

/* функция debounce */
const debounce = (cb, timeOut = TIMEOUT_DELAY) => {
  let timeOutId;
  return (...rest) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      cb.apply(this, rest);
    }, timeOut);
  };
};

/* функция throttle */
const throttle = (cb, timeOut = TIMEOUT_DELAY) => {
  let timeOutId = null;
  return (...rest) => {
    if (timeOutId) {
      return;
    }
    timeOutId = setTimeout(() => {
      cb.apply(this, rest);
      timeOutId = null;
    }, timeOut);
  };
};

export { getRandomNumber, showErrorMessage, debounce, throttle };
