const ErrorMessage = {
  wrongFilesNumber: 'Максимальное количество загружаемых файлов: ',
  wrongFormat: 'Неверный формат загружаемого файла. Загрузите файл изображения.',
};

const DEFAULT_ALT_TEXT = 'Вид предлагаемого жилья';

/*
  Clear error message on blur.
  Otherwise the message will be unnecessary shown on form submit.
*/
const onInputBlur = (evt) => {
  const input = evt.target;

  if (!input.value) {
    input.setCustomValidity('');
    input.reportValidity();
  }
};

const createImage = (imageSize, container, altText, file) => {
  const image = document.createElement('img');
  image.alt = altText;
  image.style.objectFit = 'contain';
  image.width = parseInt(imageSize.width, 10);
  image.height = parseInt(imageSize.height, 10);
  attachFileToImage(image, file);
  container.appendChild(image);

  return image;
};

const setImageFileInputError = (input, message) => {
  input.setCustomValidity(message);
  input.value = '';
  input.addEventListener('blur', onInputBlur);
};

const attachFileToImage = (image, file) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
};

const onImageFileInputChange = ({
  image,
  imageSize,
  container,
  maximumAllowedFilesNumber = 1,
}, evt) => {
  const input = evt.target;
  const files = input.files;

  if (files.length > maximumAllowedFilesNumber) {
    setImageFileInputError(input, `${ErrorMessage.wrongFilesNumber}${maximumAllowedFilesNumber}`);
  } else {
    let isError = false;

    if (container) {
      container.textContent = '';
    }

    for (const file of files) {

      if (file.type.startsWith('image/')) {

        if (!image) {
          createImage(imageSize, container, DEFAULT_ALT_TEXT, file);
        } else {
          attachFileToImage(image, file);
        }
      } else {
        isError = true;
        setImageFileInputError(input, ErrorMessage.wrongFormat);
        break;
      }
    }

    if (!isError) {
      input.setCustomValidity('');
    }
  }

  input.reportValidity();
};

const resetImageFileInput = (input) => {
  input.value = '';
  input.removeEventListener('blur', onInputBlur);
};

export { onImageFileInputChange, resetImageFileInput };
