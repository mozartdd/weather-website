import * as api from './apiCall.js';
import * as controls from './controls.js';

const DAYS_IN_WEEK = 7;
const STARTING_IDX = 1;

export async function updateWeather(location) {
  if(!location) {
    return null;
  }
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

// Displays current weather data on webpage
function displayCurrentWeather(data) {
  const icon = returnCorrectWeatherIcon(data.icon);
  console.log(icon);

  document.querySelector('[data-curr-icon]').setAttribute('src', icon);
  document.querySelector('[data-time]').textContent = data.currentTime;
  document.querySelector('[data-curr-temp] p:first-child').textContent =
    postfixElementDegree(data);
  document.querySelector('[data-curr-forecast]').textContent = data.conditions;
  document.querySelector('[data-feels-like]').textContent =
    'Feels like ' + postfixElementDegree(data);
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-location]').textContent = data.address;
  document.querySelector('[data-air]').textContent = data.cloudCover + 'AQI';
  document.querySelector('[data-wind]').textContent = postfixElementSpeed(data);
  document.querySelector('[data-humid]').textContent = data.humidity + '%';
  document.querySelector('[data-visibility]').textContent =
    postfixElementWithDistance(data);
  document.querySelector('[data-sunrise-time]').textContent = data.sunrise;
  document.querySelector('[data-sunset-time]').textContent = data.sunset;
}

// Creates html elements for each day in future weather forecast
export function createFutureWeatherCards() {
  const futureContainer = document.querySelector('[data-future-cards]');

  for (let i = STARTING_IDX; i < DAYS_IN_WEEK + 1; i++) {
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
    icon.setAttribute('aria-hidden', 'true');
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

// Adds content to future weather day cards
async function displayFutureWeather(location) {

  for (let i = STARTING_IDX; i < DAYS_IN_WEEK + 1; i++) {
    const f = await api.getFutureWeatherData(location, i);
    let icon = returnCorrectWeatherIcon(f.icon);

    i === STARTING_IDX
      ? (document.querySelector(`[data="${i}"] .future-day`).textContent =
          'Tomorrow')
      : (document.querySelector(`[data="${i}"] .future-day`).textContent =
          f.fDay);
    document.querySelector(`[data="${i}"] .weather-icon`).textContent = 'ICON';
    document.querySelector(`[data="${i}"] .future-forecast`).textContent =
      f.fConditions;
    document.querySelector(`[data="${i}"] .future-weather`).textContent =
      futureTempPostfix(f);
    document.querySelector(`[data="${i}"] .future-wind`).textContent =
      futureWindSpeed(f);
      document.querySelector(`[data="${i}"] .weather-icon`).setAttribute('src', icon);
  }
}

function postfixElementSpeed(data) {
  const notImperial = controls.currentMeasurement();
  return notImperial ? data.windKm + ' Km/ph' : data.windM + ' M/ph';
}
function postfixElementDegree(data) {
  const notImperial = controls.currentMeasurement();
  return notImperial ? data.tempC + '°C' : data.tempF + '°F';
}
function postfixElementWithDistance(data) {
  const notImperial = controls.currentMeasurement();
  return notImperial ? data.visibility + ' Km' : data.visibility + ' Miles';
}
function futureTempPostfix(data) {
  const notImperial = controls.currentMeasurement();
  return notImperial ? data.fTempC + '°C' : data.fTempF + '°F';
}
function futureWindSpeed(data) {
  const notImperial = controls.currentMeasurement();
  return notImperial
    ? data.fWindKm + ' Km/ph'
    : data.fWindM + ' M/ph';
}

function returnCorrectWeatherIcon(icon) {
  const icons = {
    'clear-day': require('../assets/clear-day.svg'),
    'clear-night': require('../assets/clear-night.svg'),
    'partly-cloudy-night': require('../assets/partly-cloudy-night.svg'),
    'partly-cloudy-day': require('../assets/partly-cloudy-day.svg'),
    'cloudy': require('../assets/cloudy.svg'),
    'wind': require('../assets/wind.svg'),
    'fog': require('../assets/fog.svg'),
    'rain': require('../assets/rain.svg'),
    'snow': require('../assets/snow.svg'),
  }

  return icons[icon] || icons['partly-cloudy-day'];
}

createFutureWeatherCards();
