import { closeUploadForm } from './upload-photo'; // импорт функции закрытия окна
import { pristine } from './validation-form';

/* функция отправки данных на сервер */
export const setFormData = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    const formData = new FormData(evt.target);

    fetch('https://31.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData
      }
    )
      .then(() => closeUploadForm());
  }
};

/* функция получения данных с сервера */
export const getServerData = async () => {
  const responce = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
  const serverData = await responce.json();

  return serverData;
};
