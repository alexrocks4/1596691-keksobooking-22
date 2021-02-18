const adTypeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const AdTypeTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const checkMinMaxArguments = (min, max) => {
  if (min > max || min < 0) {
    throw 'Wrong function arguments. Minimum value must be 0 or positive and lower or equal to maximum';
  }
}

const getRandomIntegerInclusive = (min, max) => {
  checkMinMaxArguments(min, max);
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomFloatInclusive = (min, max, precision = 0) => {
  checkMinMaxArguments(min, max);
  if (!Number.isInteger(precision) || precision < 0) {
    throw 'Precision must be integer Number and greater than 0';
  }

  let randomFloat = Math.random() * (max - min) + min;
  return +randomFloat.toFixed(precision);
}

const getRandomArrayElement = (elements) => {
  const randomArrayIndex = getRandomIntegerInclusive(0, elements.length - 1);

  return elements[randomArrayIndex];
}

const getRandomlySlicedArray = (inputArray) => {
  const randomStartIndex = getRandomIntegerInclusive(0, inputArray.length - 1);
  const randomEndIndex = randomStartIndex + getRandomIntegerInclusive(0, inputArray.length - 1) + 1;

  return inputArray.slice(randomStartIndex, randomEndIndex);
}

/**
 * Creates array of the give length populated with elements generated by callback function
 *
 * @param {number} length - Length of the array to be created
 * @param {function} cb - Callback function which returns value for each array element
 * @return {object}  Generated array
 */
const getArray = (length = 0, cb) => {
  return Array.from({ length: length }, cb);
}

const createAdCapacityContent = (rooms, guests) => {
  let roomsText = '';
  let guestsText = '';

  if (rooms) {
    if (rooms === 1) {
      roomsText = '1 комната';
    } else if (rooms > 1 && rooms < 5) {
      roomsText = `${rooms} комнаты`;
    } else {
      roomsText = `${rooms} комнат`;
    }
  }

  if (guests) {
    guestsText = guests === 1 ? `для ${guests} гостя` : `для ${guests} гостей`;
  }

  return `${roomsText} ${guestsText}`;
};

export {
  AdTypeTranslation,
  adTypeToMinPrice,
  getRandomIntegerInclusive,
  getRandomFloatInclusive,
  getRandomArrayElement,
  getRandomlySlicedArray,
  getArray,
  createAdCapacityContent
};
