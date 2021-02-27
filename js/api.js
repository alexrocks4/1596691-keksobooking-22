const checkResponseErrorStatus = (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка получения данных с сервера: \
    ${response.status} ${response.statusText}`);
  }
};

const getData = ({onSuccess, onFailure, url}) => {
  fetch(url)
    .then((response) => {
      checkResponseErrorStatus(response);

      return response.json();
    })
    .then(onSuccess)
    .catch(onFailure);
};

const postFormData = ({onSuccess, onFailure, url, body}) => {
  fetch(url,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      checkResponseErrorStatus(response);

      return response.json()
    })
    .then(onSuccess)
    .catch(onFailure);
};

export { getData, postFormData };
