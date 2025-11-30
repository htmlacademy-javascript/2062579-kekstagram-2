/* функция получения случайного числа в диапазоне от А до В */
const getRandomNumber = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* функция генерации id, по умолчанию начинается с 0 */
const createId = (start = 0) => {
  let lastCreateId = start;
  return () => lastCreateId++;
};

export { getRandomNumber, createId };
