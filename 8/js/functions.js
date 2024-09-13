// // 1. Функция проверки длины строки:
// function validateStringLength (string, maxLength) {
//   const result = (string.length <= maxLength);
//   return result;
// }

// validateStringLength ('fgfjfjk', 10);


// // 2. Функция проверки палиндрома:
// function validatePalindrom (string) {
//   const stringNormalize = string.replaceAll(' ', '').toLowerCase(); // нормализуем полученную строку

//   let stringReverse = ''; // создаем новую перевернутую

//   for (let i = (stringNormalize.length - 1); i >= 0; i--) { // заполняем перевенутую строку
//     stringReverse += stringNormalize.at(i);
//   }

//   const result = (stringReverse === stringNormalize); // сверяем перевернутую и полученную
//   return result;
// }

// validatePalindrom ('Лёша на полке клопа нашёл');


// // 3. Функция извлечения числа:
// function getNumber (string) {
//   const stringNormalize = string.toString().replaceAll(' ', ''); // явно приводим полученные данные к типу строка и удаляем все пробелы

//   let stringNumber = ''; // создаем новую строку

//   for (let i = 0; i < stringNormalize.length; i++) { // заполняем новую строку только цифрами
//     if (stringNormalize.at(i) >= 0 && stringNormalize.at(i) <= 9) {
//       stringNumber += stringNormalize.at(i);
//     }
//   }

//   const result = parseInt(stringNumber, 10); // приводим полученную строку к целому числу
//   return result;
// }

// getNumber('а я томат-2024');


// 4. Функция "Делу - время"
const calculateWorkTime = (startWork, endWork, startMeeting, timeMeeting) => {
  const MINUTES_IN_HOUR = 60;
  const startWorkTime = Number(startWork.split(':')[0]) * MINUTES_IN_HOUR + Number(startWork.split(':')[1]);
  const endWorkTime = Number(endWork.split(':')[0]) * MINUTES_IN_HOUR + Number(endWork.split(':')[1]);
  const startMeetingTime = Number(startMeeting.split(':')[0]) * MINUTES_IN_HOUR + Number(startMeeting.split(':')[1]);
  const timeToEnd = endWorkTime - startMeetingTime;

  return !(startMeetingTime < startWorkTime || startMeetingTime > endWorkTime || timeToEnd < timeMeeting);
};

calculateWorkTime('08:30', '17:30', '14:00', 90);
