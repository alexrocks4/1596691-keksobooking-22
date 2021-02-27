import {
  adTypeToMinPrice,
  changeFormState,
  TOKIYO_GEO_POSITON
} from './util.js';
import { postFormData } from './api.js';

const DEACTIVATION_CLASSNAME = 'ad-form--disabled';
const INTERACTIVE_ELEMENTS_SELECTOR = 'fieldset';
const AD_ADDRESS_PRECISION = 5;
const MIN_AD_TITLE_LENGTH = 30;
const MAX_AD_TITLE_LENGTH = 100;
const MAX_AD_PRICE = 1000000;
const MAX_ROOMS_NUMBER = 100;
const AD_FORM_SUBMIT_URL = 'https://22.javascript.pages.academy/keksobooking';

const adForm = document.querySelector('.ad-form');
const adType = adForm.querySelector('#type');
const adPrice = adForm.querySelector('#price');
const adTimein = adForm.querySelector('#timein');
const adTimeout = adForm.querySelector('#timeout');
const adAddress = adForm.querySelector('#address');
const adTitle = adForm.querySelector('#title');
const adRoomsNumber = adForm.querySelector('#room_number');
const adCapacity = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

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

const setReadonlyAdAddress = () => {
  adAddress.readOnly = true;
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
  adPrice.validity.rangeOverflow ?
    adPrice.setCustomValidity(`Максимальная цена не может быть больше ${MAX_AD_PRICE}!`) :
    adPrice.setCustomValidity('');
  adPrice.reportValidity();
});

const setValidAdCapacityValue = () => {
  const items = Array.from(adCapacity.children);
  const selectedItem = adCapacity.querySelector('[selected]');

  if (selectedItem.disabled) {
    const firstEnabledItem = items.find((item) => !item.disabled );
    adCapacity.value = firstEnabledItem.value;
  }
};

const validateAdCapacityValue = () => {
  const selectedItem = adCapacity.querySelector(`[value="${adCapacity.value}"]`);

  selectedItem.disabled ?
    adCapacity.setCustomValidity('Выбранное значение не подходит. \
    Выберите другое доступное значение из списка!') :
    adCapacity.setCustomValidity('');
  adCapacity.reportValidity();
};

const updateAdCapacityItems = (roomsNumber) => {

  for (const capacityItem of adCapacity.children) {
    capacityItem.disabled = roomsNumber >= MAX_ROOMS_NUMBER ?
      capacityItem.value !== '0' :
      (capacityItem.value > roomsNumber) || (capacityItem.value === '0');
  }
};

adRoomsNumber.addEventListener('change', (evt) => {
  updateAdCapacityItems(evt.target.value);
  validateAdCapacityValue();
})

adCapacity.addEventListener('change', () => {
  validateAdCapacityValue();
})

const resetAdForm = () => {
  adForm.reset();
  onAdTypeChange();
  setAdAddress(TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude);
  updateAdCapacityItems(adRoomsNumber.value);
  setValidAdCapacityValue();
};

const setAdFormSubmitListener = (onSuccess, onFailure) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    postFormData({
      onSuccess,
      onFailure,
      url: AD_FORM_SUBMIT_URL,
      body: new FormData(adForm),
    });
  });
};

const setAdFormResetButtonListener = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
};

onAdTypeChange();
onAdTimeinChange();
onAdTimeoutChange();
deactivateAdForm();
setAdAddress(TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude);
updateAdCapacityItems(adRoomsNumber.value);
setValidAdCapacityValue();
adType.addEventListener('change', onAdTypeChange);
adTimein.addEventListener('change', onAdTimeinChange);
adTimeout.addEventListener('change', onAdTimeoutChange);

export {
  activateAdForm,
  setAdAddress,
  setReadonlyAdAddress,
  resetAdForm,
  setAdFormSubmitListener,
  setAdFormResetButtonListener
};
