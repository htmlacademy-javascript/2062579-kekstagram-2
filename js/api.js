const SERVER_ADDRESS = 'https://32.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  SEND: '/',
  GET: '/data/'
};

/* функция запроса для отправки данных на сервер */
const uploadDataServer = (requestBody) => fetch(
  `${SERVER_ADDRESS}${ROUTE.SEND}`,
  {
    method: 'POST',
    body: requestBody
  }
);

/* функция получения данных с сервера */
const getServerData = async (message) => {
  let responce;
  try {
    responce = await fetch(`${SERVER_ADDRESS}${ROUTE.GET}`);
    if (!responce.ok) {
      message();
      responce = [];
      return responce;
    }
    return responce.json();
  } catch {
    message();
  }
};

export { uploadDataServer, getServerData };
