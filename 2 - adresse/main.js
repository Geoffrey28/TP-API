const btn = document.querySelector('#btn');
const locationContainer = document.querySelector('#location');
const addressContainer = document.querySelector('#address');
let latitude, longitude;

navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
});

btn.addEventListener('click', () => {
    locationContainer.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    getAddress(latitude, longitude);
});

function getAddress(lat, lon) {
    let url = 'https://api-adresse.data.gouv.fr/reverse/?lon=' + lon + '&lat=' + lat;
    fetch(url).then(response => response.json()).then(response => {
        console.log(response);
        addressContainer.textContent = response.features[0].properties.label
    });
}