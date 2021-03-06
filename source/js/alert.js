const SHOW_TIMEOUT = 5000;

const createAlert = () => {
  const element = document.createElement('p');
  element.setAttribute('role', 'alert');
  element.style.position = 'absolute';
  element.style.top = '400px';
  element.style.left = '50%';
  element.style.transform = 'translateX(-50%)';
  element.style.zIndex = '1000';
  element.style.backgroundColor = 'red';
  element.style.color = 'white';
  element.style.padding = '40px';
  element.style.display = 'none';

  return element;
};

const showAlert = (message) => {
  alert.style.display = 'block';
  alert.textContent = message;

  setTimeout(() => {
    alert.style.display = 'none';
    alert.textContent = '';
  }, SHOW_TIMEOUT);
};

const alert = createAlert();
document.body.appendChild(alert);

export { showAlert };
