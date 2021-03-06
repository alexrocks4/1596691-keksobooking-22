import debounce from 'lodash/debounce';
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
  setMapFiltersFormChange,
  resetMapFiltersForm
} from './map-filters-form.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import { showErrorPopup } from './error-popup.js';
import { showSuccessPopup } from './success-popup.js';

const ADS_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const RERENDER_DELAY = 500;

let apiData = null;

const onSuccessfulAdFormSubmit = () => {
  showSuccessPopup();
  resetPage();
};

const renderMarkers = (adsData) => {
  addCardsToMap(createSimilarAdCards(processAdsData(adsData)));
};

const rerenderMarkers = (adsData) => {
  removeMarkersFromMap();
  renderMarkers(adsData);
};

const resetPage = () => {
  resetAdForm();
  resetMap();
  resetMapFiltersForm();
  rerenderMarkers(apiData);
};

initializeMap(() => {
  activateAdForm();
  setReadonlyAdAddress();
  getData({
    onSuccess: (adsData) => {
      apiData = adsData;
      renderMarkers(adsData);
      setMapFiltersFormChange(debounce(() => {
        rerenderMarkers(adsData);
      }, RERENDER_DELAY));
    },
    onFailure: showAlert,
    url: ADS_DATA_URL,
  })
    .then(() => activateMapFiltersForm());
});
setAdFormSubmitListener(onSuccessfulAdFormSubmit, showErrorPopup);
setAdFormResetButtonListener(() => {
  resetPage();
});
setMainMarkerDragAction(setAdAddress);
