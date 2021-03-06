import { onImageFileInputChange, resetImageFileInput } from './image-file-input.js';

const AVATAR_DEFAULT_IMAGE = 'img/muffin-grey.svg';

const form = document.querySelector('.ad-form');
const fileInput = form.querySelector('[name="avatar"]');
const previewImage = form.querySelector('.ad-form-header__preview img');

const resetAvatar = () => {
  previewImage.src = AVATAR_DEFAULT_IMAGE;
  resetImageFileInput(fileInput);
};

fileInput.addEventListener('change', onImageFileInputChange.bind(null, {image: previewImage}));

export { resetAvatar };
