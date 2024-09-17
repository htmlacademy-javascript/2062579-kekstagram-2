/*фунция получения псевдослучайного числа*/
const getRandomNumber = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

// функция проверяющая нажата ли клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, isEscapeKey};
