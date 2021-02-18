import { getRandomIntegerInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomlySlicedArray, getArray } from './util.js';

const OFFER_TITLES = [
  'Лучшие аппартаменты в Токио',
  'Уютное местечко в центре Токио',
  '',
];
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const TIME_POINTS = [
  '12:00',
  '13:00',
  '14:00',
];
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_DESCRIPTION = [
  'Новая, современная дизайнерская квартира после евроремонта. 24-й этаж и панорамное остекление от пола до потолка - потрясающий вид и удивительные закаты каждый вечер!',
  'Все необходимое для Вашего отдыха и вещей. Есть кондиционер, стиральная машинка, плита с духовкой. В санузле установлена ванна. В кухне-студии диван и второй телевизор. Квартира ухожена, сдается на длятельный срок без изменения цены в летний период.',
  'Квартира с евроремонтом. Тёплый дом из красного кирпича. Квартира сдаётся с мебелью и техникой. Тепловой счётчик на отопление',
];
const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const TOKYO_LATITUDE_START = 35.65;
const TOKYO_LATITUDE_END = 35.7;
const TOKYO_LONGITUDE_START = 139.7;
const TOKYO_LONGITUDE_END = 139.8;
const COORDINATES_PRECISION = 5;
const MIN_OFFER_PRICE = 1;
const MIN_OFFER_ROOMS = 1;
const MIN_OFFER_GUESTS = 1;
const MAX_OFFER_PRICE = 100000;
const MAX_OFFER_ROOMS = 10;
const MAX_OFFER_GUESTS = 10;


const getRandomAvatar = () => {
  const avatarId = '0' + getRandomIntegerInclusive(1, 8);

  return `img/avatars/user${avatarId}.png`;
}

const getAd = () => {
  const ad = {
    author: {
      avatar: getRandomAvatar(),
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLES),
      price: getRandomIntegerInclusive(MIN_OFFER_PRICE, MAX_OFFER_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomIntegerInclusive(MIN_OFFER_ROOMS, MAX_OFFER_ROOMS),
      guests: getRandomIntegerInclusive(MIN_OFFER_GUESTS, MAX_OFFER_GUESTS),
      checkin: getRandomArrayElement(TIME_POINTS),
      checkout: getRandomArrayElement(TIME_POINTS),
      features: getRandomlySlicedArray(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTION),
      photos: getRandomlySlicedArray(OFFER_PHOTOS),
    },
    location: {
      x: getRandomFloatInclusive(TOKYO_LATITUDE_START, TOKYO_LATITUDE_END, COORDINATES_PRECISION),
      y: getRandomFloatInclusive(TOKYO_LONGITUDE_START, TOKYO_LONGITUDE_END, COORDINATES_PRECISION),
    },
  }

  ad.offer.address = `${ad.location.x}, ${ad.location.y}`;

  return ad;
}

const getTestAds = (adsCount) => getArray(adsCount, getAd);

export { getTestAds };
