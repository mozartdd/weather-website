import * as api from './apiCall.js';

let currentLocation = 'Cleethorpes, england';

async function updateWeather(location) {
  try {
    const data = await api.getWeatherData(location);

    displayCurrentWeather(data);
  }
  catch(error) {
    console.error('Error fetching weather details:', error);
  }
}

function displayCurrentWeather(data) {
  document.querySelector('[data-time]').textContent = data.currentTime;
  document.querySelector('[data-curr-temp] p:first-child').textContent = data.tempC;
  document.querySelector('[data-curr-forecast]').textContent = data.conditions;
  document.querySelector('[data-feels-like]').textContent = 'Feels like ' + data.feelsLikeC;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-location]').textContent = data.address;
  document.querySelector('[data-air]').textContent = data.cloudCover + 'AQI';
  document.querySelector('[data-wind]').textContent = data.windKm;
  document.querySelector('[data-humid]').textContent = data.humidity + '%';
  document.querySelector('[data-visibility]').textContent = data.visibility;
}

updateWeather(currentLocation);
