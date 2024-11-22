// адрес для получения данных с сервера
const SERVER_URL_DATA = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
// адрес для отправки данных на сервер
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
// методы
const methods = {
  GET: 'GET',
  POST: 'POST',
};
// шаблон сообщения об ошибке загрузки данных
const errorLoadDataTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const pageBody = document.body;
// время отображения сообщения об ошибке
const REMOVE_ERROR_MESSAGE_TIMEOUT = 5000;

// функция отображения сообщения об ошибке
const showErrorMessage = () => {
  // клонирую элемент по шаблону
  const errorLoadDataElement = errorLoadDataTemplate.cloneNode(true);
  // добавляю клонированный элемент на страницу
  pageBody.append(errorLoadDataElement);
  // нахожу этот элемент
  const errorMessageElement = document.querySelector('.data-error');
  // удаляю его через установленное время
  setTimeout(() => {
    errorMessageElement.remove();
  }, REMOVE_ERROR_MESSAGE_TIMEOUT);
};
// функция обращения к серверу
const loader = async (address, method, body) => {
  const response = await fetch(address, {method, body});
  return response.ok ? await response.json() : Promise.reject();
};
// функция получения данных с сервера
const getServerData = () => loader(SERVER_URL_DATA, methods.GET, null);
// функция отправки данных на сервер
const postServerData = (body) => loader(BASE_URL, methods.POST, body);

export {getServerData, postServerData, showErrorMessage};
