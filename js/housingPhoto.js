import { onInputChange, resetImageFileInput } from './image-file-input.js';

const form = document.querySelector('.ad-form');
const fileInput = form.querySelector('[name="images"]');
const previewContainer = form.querySelector('.ad-form__photo');

const resetHousingPhoto = () => {
  resetImageFileInput(fileInput);
  previewContainer.textContent = '';
};

fileInput.addEventListener('change', onInputChange.bind(null, {container: previewContainer}));

export { resetHousingPhoto };
