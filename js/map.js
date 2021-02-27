import { TOKIYO_GEO_POSITON } from './util.js';

let map = null;
const L = window.L;
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
);

const initializeMap = (cb) => {
  map = L.map('map-canvas')
    .on('load', () => cb())
    .setView(
      [TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude],
      12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
};

const setMainMarkerDragAction = (cb) => {
  mainMarker.on('drag', (evt) => {
    cb(evt.latlng.lat, evt.latlng.lng);
  })
};

const resetMap = () => {
  mainMarker.setLatLng([TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude]);
  map.flyTo([TOKIYO_GEO_POSITON.latitude, TOKIYO_GEO_POSITON.longitude]);
};

const addCardsToMap = (adCards) => {

  adCards.forEach(({ ad, location }) => {
    L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    )
      .addTo(map)
      .bindPopup(ad);
  })
};

export {
  addCardsToMap,
  resetMap,
  setMainMarkerDragAction,
  initializeMap
};
