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

//To bypass Eslint errors (no-unused-vars)
getRandomIntegerInclusive(2, 10);
getRandomFloatInclusive(1.1, 1.5, 2);
