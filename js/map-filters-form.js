import { changeFormState } from './util.js';

const DEACTIVATION_CLASSNAME = 'map__filters--disabled';
const INTERACTIVE_ELEMENTS_SELECTOR = 'select, fieldset';

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

const filterAdsData = (adsData, mapFilterFormData) => {

  return adsData.filter(({offer}) => {
    let isSuitableAdData = true;
    const housingTypeFormValue = mapFilterFormData.get('housing-type');
    const housingRoomsFormValue = mapFilterFormData.get('housing-rooms');

    if (housingTypeFormValue !== 'any' && offer.type !== housingTypeFormValue) {
      isSuitableAdData = false;
    } else if (housingRoomsFormValue !== 'any' && offer.rooms.toString() !== housingRoomsFormValue) {
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

deactivateMapFiltersForm();

export {
  activateMapFiltersForm,
  processAdsData,
  setMapFiltersFormChange
};
