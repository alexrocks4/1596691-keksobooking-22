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

deactivateMapFiltersForm();

export { activateMapFiltersForm };
