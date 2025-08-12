import * as api from './apiCall.js';

let currentLocation = 'Cleethorpes, england';

async function updateWeather(location) {
  try {
    const data = await api.getWeatherData(location);

    displayCurrentWeather(data);
  } catch (error) {
    console.error('Error fetching weather details:', error);
  }
}

function displayCurrentWeather(data) {
  document.querySelector('[data-time]').textContent = data.currentTime;
  document.querySelector('[data-curr-temp] p:first-child').textContent =
    data.tempC;
  document.querySelector('[data-curr-forecast]').textContent = data.conditions;
  document.querySelector('[data-feels-like]').textContent =
    'Feels like ' + data.feelsLikeC;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-location]').textContent = data.address;
  document.querySelector('[data-air]').textContent = data.cloudCover + 'AQI';
  document.querySelector('[data-wind]').textContent = data.windKm;
  document.querySelector('[data-humid]').textContent = data.humidity + '%';
  document.querySelector('[data-visibility]').textContent = data.visibility;
}

function createFutureWeatherCards() {
  const futureContainer = document.querySelector('[data-future-cards]');

  for (let i = 0; i < 7; i++) {
    const card = document.createElement('div');
    const forecast = document.createElement('p');
    const weather = document.createElement('p');
    const wind = document.createElement('p');

    card.classList.add('card');

    forecast.classList.add('future-forecast');
    weather.classList.add('future-weather');
    wind.classList.add('future-wind');

    futureContainer.appendChild(card);
    card.appendChild(forecast);
    card.appendChild(weather);
    card.appendChild(wind);
  }
}

createFutureWeatherCards();
updateWeather(currentLocation);
