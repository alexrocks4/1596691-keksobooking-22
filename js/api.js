const getAdsData = (onSuccess, onFailure) => {
  fetch('https://22.javascript.pages.academy/keksobooking1/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка получения данных с сервера: \
        ${response.status} ${response.statusText}`);
      }

      return response.json()
    })
    .then((adsData) => onSuccess(adsData))
    .catch(onFailure);
};

export { getAdsData };
