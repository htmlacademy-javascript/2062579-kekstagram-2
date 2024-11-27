// допустимое число символов в хэштеге
const HASHTAG_LENGTH = 20;
// допустимое количество хэштегов
const HASHTAGS_NUMBER = 5;
// сообщение об ошибке
let errorMessage = '';

const errorHashtagMessage = () => errorMessage;

const isHashtagsValid = (value) => {
  // обнуляю текст сообщения об ошибке
  errorMessage = '';
  // введенное в инпут значение
  const inputText = value.toLowerCase().trim(); // привожу буквы к нижнему регистру и удаляю пробелы по бокам
  // если ничего не введено
  if(inputText.length === 0) {
    return true;
  }
  // разделяю по пробелам на массив из отдельных хэштегов
  const inputArray = inputText.split(/\s+/);

  // объект с правилами и проверками
  const rulesObjects = [
    {
      check: inputArray.length > HASHTAGS_NUMBER, // проверку на количество хэштегов ставлю первой для лучшего UI
      errorText: `Количество хэштегов не более ${HASHTAGS_NUMBER}`,
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      errorText: 'Начинайте хэштег с решетки `#`'
    },
    {
      check: inputArray.some((item) => item === '#'),
      errorText: 'Добавьте текст после решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      errorText: 'Ставьте между хэштегами пробел',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      errorText: 'Не повторяйте хэштеги'
    },
    {
      check: inputArray.some((item) => item.length > HASHTAG_LENGTH),
      errorText: `Длина хэштега с решеткой ${HASHTAG_LENGTH} символов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      errorText: 'Хэштег может состоять только из букв и цифр'
    }
  ];

  return rulesObjects.every((rule) => {
    const notValid = rule.check;
    if(notValid) {
      errorMessage = rule.errorText;
    }
    return !notValid;
  });
};

// экспортирую
export {isHashtagsValid, errorHashtagMessage};
