import { setupPopup, showPopup } from './popup.js';

const errorPopupTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const errorPopup = errorPopupTemplate.cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');
const showErrorPopup = () => showPopup(errorPopup, errorButton);

setupPopup(errorPopup);

export { showErrorPopup };
