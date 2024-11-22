import {isEscapeKey} from './utilities';

const pageBody = document.body;

// функция закрытия уведомления
const closeNotification = (evt) => {
  evt.stopPropagation();
  const existNotificationElement = document.querySelector('.success') || document.querySelector('.error');
  const closeNotificationButton = existNotificationElement.querySelector('button');
  if (evt.target === existNotificationElement || evt.target === closeNotificationButton || isEscapeKey(evt)) {
    existNotificationElement.remove();
    pageBody.removeEventListener('click', closeNotification);
    pageBody.removeEventListener('keydown', closeNotification);
  }
};
// функция добавления уведомления
const appendNotification = (template) => {
  const notificationElement = template.cloneNode(true);
  pageBody.append(notificationElement);
  pageBody.addEventListener('click', closeNotification);
  pageBody.addEventListener('keydown', closeNotification);
};

export {appendNotification, closeNotification};
