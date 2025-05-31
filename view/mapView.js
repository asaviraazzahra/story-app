import L from 'leaflet';

export function initMap(containerId = 'map', defaultLat = -6.2, defaultLng = 106.8, onClickCallback = null) {
  const map = L.map(containerId).setView([defaultLat, defaultLng], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  if (onClickCallback) {
    map.on('click', onClickCallback);
  }

  return map;
}

export function addMarker(map, lat, lng, popupText = '') {
  L.marker([lat, lng]).addTo(map).bindPopup(popupText);
}
