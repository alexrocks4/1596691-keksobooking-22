import { setupPopup, showPopup } from './popup.js';

const successPopupTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const successPopup = successPopupTemplate.cloneNode(true);
const showSuccessPopup = () => showPopup(successPopup);

setupPopup(successPopup);

export { showSuccessPopup };
