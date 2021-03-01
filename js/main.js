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
  initializeMap,
  removeMarkersFromMap
} from './map.js';
import {
  activateMapFiltersForm,
  processAdsData,
  setMapFiltersFormChange
} from './map-filters-form.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { showErrorPopup } from './error-popup.js';
import { showSuccessPopup } from './success-popup.js';

const _ = window._;
const ADS_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const RERENDER_DELAY = 500;

const resetPage = () => {
  resetAdForm();
  resetMap();
};

const onSuccessfullAdFormSubmit = () => {
  showSuccessPopup();
  resetPage();
};

const renderCards = (adsData) => {
  addCardsToMap(createSimilarAdCards(processAdsData(adsData)));
};

initializeMap(() => {
  activateAdForm();
  setReadonlyAdAddress();
  getData({
    onSuccess: (adsData) => {
      renderCards(adsData);
      setMapFiltersFormChange(_.debounce(() => {
        removeMarkersFromMap();
        renderCards(adsData);
      }, RERENDER_DELAY));
    },
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
