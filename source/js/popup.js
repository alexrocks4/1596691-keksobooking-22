import { isEscapeKey } from './util.js';

const setupPopup = (popup) => {
  const main = document.querySelector('main');
  popup.style.display = 'none';
  popup.style.zIndex = '1000';
  main.appendChild(popup);
};

const showPopup = (popup, closeButton) => {

  const hidePopup = () => {
    popup.style.display = 'none';
    document.removeEventListener('keydown', onEscKeydown);
    popup.removeEventListener('click', onPopupClick);

    if (closeButton) {
      closeButton.removeEventListener('click', onCloseButtonClick);
    }
  };

  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt.keyCode)) {
      hidePopup();
    }
  };

  const onPopupClick = (evt) => {
    if (evt.target === popup) {
      hidePopup();
    }
  };

  const onCloseButtonClick = () => hidePopup();

  popup.style.display = 'block';
  document.addEventListener('keydown', onEscKeydown);
  popup.addEventListener('click', onPopupClick);

  if (closeButton) {
    closeButton.addEventListener('click', onCloseButtonClick);
  }

};

export { setupPopup, showPopup };
