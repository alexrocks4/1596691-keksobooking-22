import { changeFormState } from './util.js';

const DEACTIVATION_CLASSNAME = 'map__filters--disabled';
const INTERACTIVE_ELEMENTS_SELECTOR = 'select, fieldset';
const HOUSING_PRICE_CATEGORIES = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: +Infinity,
  },
};

const mapFiltersForm = document.querySelector('.map__filters');

const activateMapFiltersForm = () => {
  changeFormState({
    formElement: mapFiltersForm,
    deactivationClassName: DEACTIVATION_CLASSNAME,
    interactiveElementsSelector: INTERACTIVE_ELEMENTS_SELECTOR,
    isActivation: true,
  })
};

const deactivateMapFiltersForm = () => {
  changeFormState({
    formElement: mapFiltersForm,
    deactivationClassName: DEACTIVATION_CLASSNAME,
    interactiveElementsSelector: INTERACTIVE_ELEMENTS_SELECTOR,
    isActivation: false,
  })
};

const isFilledMapFilterForm = (mapFilterFormData) => {
  let isFormFilled = false;

  for (const [name, value] of mapFilterFormData.entries()) {

    if (((name === 'features') && value.length) || (value !== 'any')) {
      isFormFilled = true;
      break;
    }
  }

  return isFormFilled;
}

const isPriceSuitable = (housingPriceFormValue, offerPrice) => {
  const minPrice = HOUSING_PRICE_CATEGORIES[housingPriceFormValue].min;
  const maxPrice = HOUSING_PRICE_CATEGORIES[housingPriceFormValue].max;

  return offerPrice >= minPrice && offerPrice < maxPrice;
};

const isFeaturesSuitable = (featuresFormValue, offerFeatures) => {

  return offerFeatures.length && featuresFormValue.every((formFeature) => offerFeatures.includes(formFeature));
};

const filterAdsData = (adsData, mapFilterFormData) => {
  const housingTypeFormValue = mapFilterFormData.get('housing-type');
  const housingRoomsFormValue = mapFilterFormData.get('housing-rooms');
  const housingPriceFormValue = mapFilterFormData.get('housing-price');
  const housingGuestsFormValue = mapFilterFormData.get('housing-guests');
  const featuresFormValue = mapFilterFormData.getAll('features');

  return adsData.filter(({offer}) => {
    let isSuitableAdData = true;

    if (housingTypeFormValue !== 'any' && offer.type !== housingTypeFormValue) {
      isSuitableAdData = false;
    } else if (housingRoomsFormValue !== 'any' && offer.rooms.toString() !== housingRoomsFormValue) {
      isSuitableAdData = false;
    } else if (housingPriceFormValue !== 'any' && !isPriceSuitable(housingPriceFormValue, offer.price)) {
      isSuitableAdData = false;
    } else if (housingGuestsFormValue !== 'any' && offer.guests.toString() !== housingGuestsFormValue) {
      isSuitableAdData = false;
    } else if (featuresFormValue.length && !isFeaturesSuitable(featuresFormValue, offer.features)) {
      isSuitableAdData = false;
    }

    return isSuitableAdData;
  });
};

const processAdsData = (adsData) => {
  const mapFilterFormData = new FormData(mapFiltersForm);

  if (isFilledMapFilterForm(mapFilterFormData)) {
    adsData = filterAdsData(adsData, mapFilterFormData);
  }

  return adsData;
};

const setMapFiltersFormChange = (cb) => {
  mapFiltersForm.addEventListener('change', cb);
}

const resetMapFiltersForm = () => {
  mapFiltersForm.reset();
};

deactivateMapFiltersForm();

export {
  activateMapFiltersForm,
  processAdsData,
  setMapFiltersFormChange,
  resetMapFiltersForm
};
