import { createSimilarAdCards } from './similar-ad-cards.js';
import {
  resetAdForm,
  setAdFormSubmitListener,
  setAdFormResetButtonListener,
  setAdAddress,
  activateAdForm,
  setReadonlyAdAddress
} from './ad-form.js';
import {
  addCardsToMap,
  resetMap,
  setMainMarkerDragAction,
  initializeMap
} from './map.js';
import { activateMapFiltersForm } from './map-filters-form.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { showErrorPopup } from './error-popup.js';
import { showSuccessPopup } from './success-popup.js';

const MAX_ADS_COUNT = 10;
const ADS_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

const resetPage = () => {
  resetAdForm();
  resetMap();
};

const onSuccessfullAdFormSubmit = () => {
  showSuccessPopup();
  resetPage();
};

initializeMap(() => {
  activateAdForm();
  setReadonlyAdAddress();
  getData({
    onSuccess: (adsData) => addCardsToMap(createSimilarAdCards(adsData.slice(0, MAX_ADS_COUNT))),
    onFailure: showAlert,
    url: ADS_DATA_URL,
  })
    .then(() => activateMapFiltersForm());
});
setAdFormSubmitListener(onSuccessfullAdFormSubmit, showErrorPopup);
setAdFormResetButtonListener(() => {
  resetPage();
});
setMainMarkerDragAction(setAdAddress);
