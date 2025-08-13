import * as api from './apiCall.js';
import * as controls from './controls.js';
const DAYS_IN_WEEK = 7;
const STARTING_IDX = 1;

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

// Displays current weather data on webpage
function displayCurrentWeather(data) {
  document.querySelector('[data-time]').textContent = data.currentTime;
  document.querySelector('[data-curr-temp] p:first-child').textContent = postfixElementDegree(data);
  document.querySelector('[data-curr-forecast]').textContent = data.conditions;
  document.querySelector('[data-feels-like]').textContent =
    'Feels like ' + postfixElementDegree(data)
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-location]').textContent = data.address;
  document.querySelector('[data-air]').textContent = data.cloudCover + 'AQI';
  document.querySelector('[data-wind]').textContent = postfixElementSpeed(data);
  document.querySelector('[data-humid]').textContent = data.humidity + '%';
  document.querySelector('[data-visibility]').textContent = postfixElementWithDistance(data);
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
    const futureData = await api.getFutureWeatherData(location, i);

    i === STARTING_IDX
    ? document.querySelector(`[data="${i}"] .future-day`).textContent =
      'Tomorrow'
    : document.querySelector(`[data="${i}"] .future-day`).textContent =
      futureData.futureDay;
    document.querySelector(`[data="${i}"] .weather-icon`).textContent = 'ICON';
    document.querySelector(`[data="${i}"] .future-forecast`).textContent =
      futureData.futureConditions;
    document.querySelector(`[data="${i}"] .future-weather`).textContent = futureTempPostfix(futureData);
    document.querySelector(`[data="${i}"] .future-wind`).textContent =  futureWindSpeed(futureData)
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
  return notImperial ? data.futureTempC + '°C' : data.futureTempF + '°F';
}
function futureWindSpeed(data) {
  const notImperial = controls.currentMeasurement();
  return notImperial ? data.futureWindKm + ' Km/ph' : data.futureWindM + ' M/ph';
}

createFutureWeatherCards();
