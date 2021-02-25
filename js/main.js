import { createSimilarAdCards } from './similar-ad-cards.js';
import './ad-form.js';
import './map-filters-form.js';
import { addCardsToMap } from './map.js';
import { getAdsData } from './api.js';
import { showAlert } from './alert.js';

const MAX_ADS_COUNT = 10;

getAdsData(
  (adsData) => addCardsToMap(createSimilarAdCards(adsData.slice(0, MAX_ADS_COUNT))),
  showAlert,
);


