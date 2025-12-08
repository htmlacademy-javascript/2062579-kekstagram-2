const ERROR_MESSAGE_TIMEOUT = 5000; // время показа сообщения об ошибке загрузки данных
const body = document.querySelector('body');
const errorGetMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error'); // шаблон сообщения о неуспешной загрузке данных

/* функция получения случайного числа в диапазоне от А до В */
const getRandomNumber = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* функция генерации уникальных случайных значений из диапазона */
const getUnicRandomIds = (min, max) => {
  const arrayUnicRandomIds = [];
  return function () {
    let newId = getRandomNumber(min, max);

    if (arrayUnicRandomIds.length >= (max - min + 1)) {
      return null;
    }

    while (arrayUnicRandomIds.includes(newId)) {
      newId = getRandomNumber(min, max);
    }
    arrayUnicRandomIds.push(newId);
    return newId;
  };
};

// const getUnicRandomPictureIds = getUnicRandomIds(0, 24);


/* функция генерации id, по умолчанию начинается с 0 */
const createId = (start = 0) => {
  let lastCreateId = start;
  return () => lastCreateId++;
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
const debounce = (cb, timeOut) => {
  let timeOutId;
  return (...rest) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      cb(rest);
    }, timeOut);
  };
};

/* функция throttle */
const throttle = (cb, timeOut) => {
  let timeOutId = null;
  return (...rest) => {
    if (timeOutId) {
      return;
    }
    timeOutId = setTimeout(() => {
      cb(rest);
      timeOutId = null;
    }, timeOut);
  };
};

export { getRandomNumber, createId, showErrorMessage, debounce, throttle, getUnicRandomIds };
