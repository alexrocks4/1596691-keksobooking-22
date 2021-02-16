import { getTestAds } from './test-data.js';

const TEST_ADS_COUNT = 10;
const testAdsData = getTestAds(TEST_ADS_COUNT);

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const AdTypeTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const processBlock = (isInputDataPresent, block, getBlockContent) => {

  if (isInputDataPresent) {
    block.innerHTML = getBlockContent();
  } else {
    block.style.display = 'none';
  }
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

const createAdTimeContent = (checkin, checkout) => {
  let checkinText = checkin ? `Заезд после ${checkin}` : '';
  let checkoutText = checkout ? `Выезд до ${checkout}` : '';

  if (checkin && checkout) {
    checkoutText = ', ' + checkoutText.toLowerCase();
  }

  return `${checkinText}${checkoutText}`;
};

const createAdFeaturesContent = (features) => {

  features = features.map(
    (feature) => `<li class="popup__feature popup__feature--${feature}"></li>`,
  );

  return features.join('\n');
};

const createAdPhotosContent = (urls) => {

  const photos = urls.map((url) => {
    return `<img src="${url}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
  });

  return photos.join('\n');
}

const ads = testAdsData.map(({author, offer}) => {
  const ad = cardTemplate.cloneNode(true);
  const adTitle = ad.querySelector('.popup__title');
  const adAddress = ad.querySelector('.popup__text--address');
  const adPrice = ad.querySelector('.popup__text--price');
  const adType = ad.querySelector('.popup__type');
  const adCapacity = ad.querySelector('.popup__text--capacity');
  const adTime = ad.querySelector('.popup__text--time');
  const adFeature = ad.querySelector('.popup__features');
  const adDescription = ad.querySelector('.popup__description');
  const adPhoto = ad.querySelector('.popup__photos');
  const adAvatar = ad.querySelector('.popup__avatar');
  adPhoto.innerHTML = '';

  const isAdCapacityDataPresent = !!(offer.rooms || offer.guests);
  const isAdTimeDataPresent = !!(offer.checkin || offer.checkout);
  const isAdFeatureDataPresent = !!(offer.features && offer.features.length);
  const isAdPhotoDataPresent = !!(offer.photos && offer.photos.length);

  processBlock(!!offer.title, adTitle, () => offer.title);
  processBlock(!!offer.address, adAddress, () => offer.address);
  processBlock(!!offer.price, adPrice, () => `${offer.price} <span>₽/ночь</span>`);
  processBlock(!!offer.type, adType, () => {
    return AdTypeTranslation[offer.type] ? AdTypeTranslation[offer.type] : offer.type;
  });
  processBlock(
    isAdCapacityDataPresent,
    adCapacity,
    createAdCapacityContent.bind(null, offer.rooms, offer.guests),
  );
  processBlock(
    isAdTimeDataPresent,
    adTime,
    createAdTimeContent.bind(null, offer.checkin, offer.checkout),
  );
  processBlock(
    isAdFeatureDataPresent,
    adFeature,
    createAdFeaturesContent.bind(null, offer.features),
  );
  processBlock(!!offer.description, adDescription, () => offer.description);
  processBlock(isAdPhotoDataPresent, adPhoto, createAdPhotosContent.bind(null, offer.photos));

  if (author.avatar) {
    adAvatar.src = author.avatar;
  } else {
    adAvatar.style.display = 'none';
  }

  return ad;
});

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(ads[0]);
