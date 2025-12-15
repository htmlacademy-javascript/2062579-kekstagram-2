const SERVER_ADDRESS = 'https://31.javascript.htmlacademy.pro/kekstagram';
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
  let receivedData;
  try {
    receivedData = await fetch(`${SERVER_ADDRESS}${ROUTE.GET}`);
    if (!receivedData.ok) {
      message();
      receivedData = [];
      return receivedData;
    }
    return receivedData.json();
  } catch {
    message();
  }
};

export { uploadDataServer, getServerData };
