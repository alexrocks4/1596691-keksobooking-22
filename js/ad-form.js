import {
  adTypeToMinPrice,
  changeFormState,
  TOKIYO_GEO_POSITON
} from './util.js';

const DEACTIVATION_CLASSNAME = 'ad-form--disabled';
const INTERACTIVE_ELEMENTS_SELECTOR = 'fieldset';
const AD_ADDRESS_PRECISION = 5;

const adForm = document.querySelector('.ad-form');
const adType = adForm.querySelector('#type');
const adPrice = adForm.querySelector('#price');
const adTimein = adForm.querySelector('#timein');
const adTimeout = adForm.querySelector('#timeout');
const adAddress = adForm.querySelector('#address');

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

const activateAdForm = () => {
  changeFormState({
    formElement: adForm,
    deactivationClassName: DEACTIVATION_CLASSNAME,
    interactiveElementsSelector: INTERACTIVE_ELEMENTS_SELECTOR,
    isActivation: true,
  })
};

const deactivateAdForm = () => {
  changeFormState({
    formElement: adForm,
    deactivationClassName: DEACTIVATION_CLASSNAME,
    interactiveElementsSelector: INTERACTIVE_ELEMENTS_SELECTOR,
    isActivation: false,
  })
};

const deactivateAdAddress= () => {
  adAddress.closest('fieldset').disabled = true;
};

const setAdAddress = (lat, lng) => {
  adAddress.value = `${lat.toFixed(AD_ADDRESS_PRECISION)}, ${lng.toFixed(AD_ADDRESS_PRECISION)}`;
}

onAdTypeChange();
onAdTimeinChange();
onAdTimeoutChange();
deactivateAdForm();
setAdAddress(TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude);
adType.addEventListener('change', onAdTypeChange);
adTimein.addEventListener('change', onAdTimeinChange);
adTimeout.addEventListener('change', onAdTimeoutChange);

export {
  activateAdForm,
  setAdAddress,
  deactivateAdAddress
};
