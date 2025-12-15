const ERROR_MESSAGE_TIMEOUT = 5000; // время показа сообщения об ошибке загрузки данных
const TIMEOUT_DELAY = 500; // задержка времени для троттлинга и дебаунса
const body = document.querySelector('body');
const errorGetMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error'); // шаблон сообщения о неуспешной загрузке данных

/* функция получения случайного числа в диапазоне от А до В */
const getRandomNumber = (startNumber, endNumber) => {
  const min = Math.min(startNumber, endNumber);
  const max = Math.max(startNumber, endNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* функция генерации уникальных случайных значений из диапазона */
const getUnicRandomIds = (min, max) => {
  const unicRandomIds = [];
  return function () {
    let newId = getRandomNumber(min, max);

    if (unicRandomIds.length >= (max - min + 1)) {
      return null;
    }
    while (unicRandomIds.includes(newId)) {
      newId = getRandomNumber(min, max);
    }
    unicRandomIds.push(newId);
    return newId;
  };
};

/* функция получения заданного числа уникальных ID из диапазона */
const getSetIds = (number, start, end) => {
  const setIds = [];
  const getUnicRandomPictureIds = getUnicRandomIds(start, end);
  for (let i = 0; i < number; i++) {
    const newId = getUnicRandomPictureIds();
    setIds.push(newId);
  }
  return setIds;
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

export { showErrorMessage, debounce, getSetIds };
