import * as api from './apiCall.js';
const DAYS_IN_WEEK = 7;

export async function updateWeather(location) {
  try {
    const data = await api.getWeatherData(location);

    displayCurrentWeather(data);
    displayFutureWeather(location);
  } catch (error) {
    document.querySelector('[data-location]').textContent =
      'Could not find this Location.';
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

async function displayFutureWeather(location) {
  for (let i = 1; i < DAYS_IN_WEEK + 1; i++) {
    const futureData = await api.getFutureWeatherData(location, i);

    document.querySelector(`[data="${i}"] .future-day`).textContent =
      futureData.futureDay;
    document.querySelector(`[data="${i}"] .weather-icon`).textContent = 'ICON';
    document.querySelector(`[data="${i}"] .future-forecast`).textContent =
      futureData.futureConditions;
    document.querySelector(`[data="${i}"] .future-weather`).textContent =
      futureData.futureTempC;
    document.querySelector(`[data="${i}"] .future-wind`).textContent =
      futureData.futureWindKm;
  }
}

function createFutureWeatherCards() {
  const futureContainer = document.querySelector('[data-future-cards]');

  for (let i = 1; i < DAYS_IN_WEEK + 1; i++) {
    const card = document.createElement('div');
    const forecast = document.createElement('p');
    const weather = document.createElement('p');
    const wind = document.createElement('p');
    const icon = document.createElement('img');
    const day = document.createElement('p');

    card.classList.add('card');
    card.setAttribute('data', `${i}`);

    day.classList.add('future-day');
    icon.classList.add('weather-icon');
    forecast.classList.add('future-forecast');
    weather.classList.add('future-weather');
    wind.classList.add('future-wind');

    futureContainer.appendChild(card);
    card.appendChild(day);
    card.appendChild(icon);
    card.appendChild(forecast);
    card.appendChild(weather);
    card.appendChild(wind);
  }
}

createFutureWeatherCards();
