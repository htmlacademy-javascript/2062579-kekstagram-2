const SERVER_ADDRESS = {
  'POST': 'https://31.javascript.htmlacademy.pro/kekstagram',
  'GET': 'https://31.javascript.htmlacademy.pro/kekstagram/data'
};

/* функция запроса для отправки данных на сервер */
const uploadDataServer = (requestBody) => fetch(SERVER_ADDRESS['POST'],
  {
    method: 'POST',
    body: requestBody
  }
);

/* функция получения данных с сервера */
const getServerData = async (message) => {
  let responce;
  try {
    responce = await fetch(SERVER_ADDRESS['GET']);
    if (!responce.ok) {
      message();
    }
  } catch {
    message();
  }
  return responce.json();
};

export { uploadDataServer, getServerData };
