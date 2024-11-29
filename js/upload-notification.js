import {isEscapeKey} from './utilities.js';

const pageBody = document.body;

// функция закрытия уведомления нажатием Escape
const onEscapeKeyDown = (evt) => {
  evt.stopPropagation();
  const existNotificationElement = document.querySelector('.success') || document.querySelector('.error');
  if (isEscapeKey(evt)) {
    existNotificationElement.remove();
    pageBody.removeEventListener('keydown', onEscapeKeyDown);
    // eslint-disable-next-line no-use-before-define
    pageBody.removeEventListener('click', onPageClick);
  }
};
// функция закрытия уведомления по клику
const onPageClick = (evt) => {
  evt.stopPropagation();
  const existNotificationElement = document.querySelector('.success') || document.querySelector('.error');
  const closeNotificationButton = existNotificationElement.querySelector('button');
  if (evt.target === existNotificationElement || evt.target === closeNotificationButton) {
    existNotificationElement.remove();
    pageBody.removeEventListener('keydown', onEscapeKeyDown);
    pageBody.removeEventListener('click', onPageClick);
  }
};
// функция добавления уведомления
const appendNotification = (template) => {
  const notificationElement = template.cloneNode(true);
  pageBody.append(notificationElement);
  pageBody.addEventListener('click', onPageClick);
  pageBody.addEventListener('keydown', onEscapeKeyDown);
};

export {appendNotification};
