import {
  adTypeToMinPrice,
  changeFormState,
  TOKIYO_GEO_POSITON
} from './util.js';

const DEACTIVATION_CLASSNAME = 'ad-form--disabled';
const INTERACTIVE_ELEMENTS_SELECTOR = 'fieldset';
const AD_ADDRESS_PRECISION = 5;
const MIN_AD_TITLE_LENGTH = 30;
const MAX_AD_TITLE_LENGTH = 100;
const MAX_AD_PRICE = 1000000;
const MAX_ROOMS_NUMBER = 100;

const adForm = document.querySelector('.ad-form');
const adType = adForm.querySelector('#type');
const adPrice = adForm.querySelector('#price');
const adTimein = adForm.querySelector('#timein');
const adTimeout = adForm.querySelector('#timeout');
const adAddress = adForm.querySelector('#address');
const adTitle = adForm.querySelector('#title');
const adRoomsNumber = adForm.querySelector('#room_number');
const adCapacity = adForm.querySelector('#capacity');

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

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity(`Введите еще ${MIN_AD_TITLE_LENGTH - valueLength} симв.! \
    Введено ${valueLength} симв.`);
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity(`Удалите ${valueLength - MAX_AD_TITLE_LENGTH} симв. \
    Введено ${valueLength} симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

adPrice.addEventListener('input', () => {

  if (adPrice.validity.rangeOverflow) {
    adPrice.setCustomValidity(`Максимальная цена не может быть больше ${MAX_AD_PRICE}!`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

const updateAdCapacityItems = (roomsNumber) => {

  for (const capacityItem of adCapacity.children) {

    if (roomsNumber >= MAX_ROOMS_NUMBER) {
      capacityItem.disabled = capacityItem.value !== '0' ? true : false;
    } else {
      capacityItem.disabled = (capacityItem.value > roomsNumber) || (capacityItem.value === '0') ? true : false;
    }
  }
}

adRoomsNumber.addEventListener('change', (evt) => {
  updateAdCapacityItems(evt.target.value);
})


onAdTypeChange();
onAdTimeinChange();
onAdTimeoutChange();
deactivateAdForm();
setAdAddress(TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude);
updateAdCapacityItems(adRoomsNumber.value);
adType.addEventListener('change', onAdTypeChange);
adTimein.addEventListener('change', onAdTimeinChange);
adTimeout.addEventListener('change', onAdTimeoutChange);

export {
  activateAdForm,
  setAdAddress,
  deactivateAdAddress
};
