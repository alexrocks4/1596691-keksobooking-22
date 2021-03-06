import { onImageFileInputChange, resetImageFileInput } from './image-file-input.js';

const MAXIMUM_ALLOWED_PHOTOS = 3;
const PREVIEW_CONTAINER_WIDTH = '210px';
const IMAGE_SIZE = {
  width: '70px',
  height: '70px',
}

const form = document.querySelector('.ad-form');
const fileInput = form.querySelector('[name="images"]');
const previewContainer = form.querySelector('.ad-form__photo');
previewContainer.style.width = PREVIEW_CONTAINER_WIDTH;
previewContainer.style.flexGrow = '1';
previewContainer.style.display = 'flex';
previewContainer.style.flexWrap = 'wrap';
previewContainer.style.justifyContent = 'space-between';

const resetHousingPhoto = () => {
  resetImageFileInput(fileInput);
  previewContainer.textContent = '';
};

fileInput.addEventListener('change', onImageFileInputChange.bind(null, {
  imageSize: IMAGE_SIZE,
  container: previewContainer,
  maximumAllowedFilesNumber: MAXIMUM_ALLOWED_PHOTOS,
}));

export { resetHousingPhoto };
