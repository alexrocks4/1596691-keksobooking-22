import { TOKIYO_GEO_POSITON } from './util.js';
import { activateAdForm, setAdAddress, deactivateAdAddress } from './ad-form.js';
import { activateMapFiltersForm } from './map-filters-form.js';
import { createSimilarAdCards } from './similar-ad-cards.js';

const L = window.L;
const map = L.map('map-canvas')
  .on('load', () => {
    activateAdForm();
    deactivateAdAddress();
    activateMapFiltersForm();
  })
  .setView(
    [TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude],
    12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});

const mainMarker = L.marker(
  {
    lat: TOKIYO_GEO_POSITON.latitude,
    lng: TOKIYO_GEO_POSITON.longitude,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainMarker.on('drag', (evt) => {
  setAdAddress(evt.latlng.lat, evt.latlng.lng);
})

const adCards = createSimilarAdCards();
adCards.forEach(({ ad, location }) => {
  L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon: pinIcon,
    },
  )
    .addTo(map)
    .bindPopup(ad);
})
