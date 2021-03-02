/*
  If user has selected wrong file type - clear error message on blur.
  Otherwise the message will be unnecessary shown on form submit.
*/
const onInputBlur = (evt) => {
  const input = evt.target;

  if (!input.value) {
    input.setCustomValidity('');
    input.reportValidity();
  }
};

const createImage = () => {
  const image = document.createElement('img');
  image.alt = 'Вид предлагаемого жилья';
  image.style.objectFit = 'contain';

  return image;
};

const onInputChange = ({image, container}, evt) => {
  const input = evt.target;
  const file = input.files[0];

  if (file) {

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {

        if (!image && container) {
          image = createImage();
          const containerCoordinate = container.getBoundingClientRect();
          image.width = containerCoordinate.width;
          image.height = containerCoordinate.height;
          container.textContent = '';
          container.appendChild(image);
        }

        image.src = reader.result;
      })

      reader.readAsDataURL(file);
      input.setCustomValidity('');

    } else {
      input.setCustomValidity('Неверный формат загружаемого файла. Загрузите файл изображения.');
      input.value = '';
      input.addEventListener('blur', onInputBlur);
    }

    input.reportValidity();
  }
};

const resetImageFileInput = (input) => {
  input.value = '';
  input.removeEventListener('blur', onInputBlur);
};

export { onInputChange, resetImageFileInput };
