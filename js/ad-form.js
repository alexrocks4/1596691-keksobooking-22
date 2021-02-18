import { adTypeToMinPrice } from './util.js';

const adForm = document.querySelector('.ad-form');
const adType = adForm.querySelector('#type');
const adPrice = adForm.querySelector('#price');
const adTimein = adForm.querySelector('#timein');
const adTimeout = adForm.querySelector('#timeout');

const onAdTypeChange = () => {
  const minPrice = adTypeToMinPrice[adType.value];

  if (minPrice >= 0) {
    adPrice.min = minPrice;
    adPrice.placeholder = minPrice;
  }
}

const onAdTimeinChange = () => {
  adTimeout.value = adTimein.value;
};

const onAdTimeoutChange = () => {
  adTimein.value = adTimeout.value;
};

onAdTypeChange();
onAdTimeinChange();
onAdTimeoutChange();
adType.addEventListener('change', onAdTypeChange);
adTimein.addEventListener('change', onAdTimeinChange);
adTimeout.addEventListener('change', onAdTimeoutChange);


