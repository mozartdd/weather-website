import * as api from './apiCall.js';
import * as controls from './controls.js';

const DAYS_IN_WEEK = 7;
const STARTING_IDX = 1;
let headerStyle;
let mainStyle;

// Centralized DOM selectors
const els = {
  currIcon: document.querySelector('[data-curr-icon]'),
  time: document.querySelector('[data-time]'),
  currTemp: document.querySelector('[data-curr-temp] p:first-child'),
  currForecast: document.querySelector('[data-curr-forecast]'),
  feelsLike: document.querySelector('[data-feels-like]'),
  description: document.querySelector('[data-description]'),
  location: document.querySelector('[data-location]'),
  desktopLocation: document.querySelector('[data-desktop-location]'),
  air: document.querySelector('[data-air]'),
  wind: document.querySelector('[data-wind]'),
  humid: document.querySelector('[data-humid]'),
  visibility: document.querySelector('[data-visibility]'),
  sunrise: document.querySelector('[data-sunrise-time]'),
  sunset: document.querySelector('[data-sunset-time]'),
  futureContainer: document.querySelector('[data-future-cards]'),
  loadingSvg: document.querySelector('[data-load]'),
  header: document.querySelector('header'),
  main: document.querySelector('main')
};

// Cache for future weather cards
const futureEls = {};

// Helper functions
function setText(el, value) { if (el) el.textContent = value; }
function setSrc(el, value) { if (el) el.setAttribute('src', value); }

// Postfix helpers
function postfixElementSpeed(data) {
  return controls.currentMeasurement() ? data.windKm + ' Km/ph' : data.windM + ' M/ph';
}
function postfixElementDegree(data) {
  return controls.currentMeasurement() ? data.tempC + '°C' : data.tempF + '°F';
}
function postfixElementWithDistance(data) {
  return controls.currentMeasurement() ? data.visibility + ' Km' : data.visibility + ' Miles';
}
function futureTempPostfix(data) {
  return controls.currentMeasurement() ? data.fTempC + '°C' : data.fTempF + '°F';
}
function futureWindSpeed(data) {
  return controls.currentMeasurement() ? data.fWindKm + ' Km/ph' : data.fWindM + ' M/ph';
}

// Weather icon mapping
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
  };
  return icons[icon] || icons['partly-cloudy-day'];
}

// Create child element helper
function createChild(parent, tag, cls) {
  const el = document.createElement(tag);
  el.classList.add(cls);
  parent.appendChild(el);
  return el;
}

// Create and cache future weather cards
export function createFutureWeatherCards() {
  for (let i = STARTING_IDX; i < DAYS_IN_WEEK + 1; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.day = i;

    futureEls[i] = {
      card,
      day: createChild(card, 'p', 'future-day'),
      icon: createChild(card, 'img', 'weather-icon'),
      forecast: createChild(card, 'p', 'future-forecast'),
      weather: createChild(card, 'p', 'future-weather'),
      wind: createChild(card, 'p', 'future-wind')
    };

    futureEls[i].icon.setAttribute('aria-hidden', 'true');
    els.futureContainer.appendChild(card);
  }
}

// Display current weather
function displayCurrentWeather(data) {
  setSrc(els.currIcon, returnCorrectWeatherIcon(data.icon));
  setText(els.time, data.currentTime);
  setText(els.currTemp, postfixElementDegree(data));
  setText(els.currForecast, data.conditions);
  setText(els.feelsLike, 'Feels like ' + postfixElementDegree(data));
  setText(els.description, data.description);
  setText(els.location, data.address);
  setText(els.desktopLocation, data.address);
  setText(els.air, data.cloudCover + 'AQI');
  setText(els.wind, postfixElementSpeed(data));
  setText(els.humid, data.humidity + '%');
  setText(els.visibility, postfixElementWithDistance(data));
  setText(els.sunrise, data.sunrise);
  setText(els.sunset, data.sunset);
}

// Display future weather
async function displayFutureWeather(location) {
  for (let i = STARTING_IDX; i < DAYS_IN_WEEK + 1; i++) {
    const f = await api.getFutureWeatherData(location, i);
    const card = futureEls[i];
    if (!card) continue;

    setText(card.day, i === STARTING_IDX ? 'Tomorrow' : f.fDay);
    setSrc(card.icon, returnCorrectWeatherIcon(f.icon));
    setText(card.forecast, f.fConditions);
    setText(card.weather, futureTempPostfix(f));
    setText(card.wind, futureWindSpeed(f));
  }
}

function showLoadingIcon() {
  headerStyle = els.header.style.display;
  mainStyle = els.main.style.display;

  els.loadingSvg.style.display = 'block';
  els.header.style.display = 'none';
  els.main.style.display = 'none';
}

function hideLoadingIcon() {
  els.loadingSvg.style.display = 'none';
  els.header.style.display = headerStyle;
  els.main.style.display = mainStyle;
}

// Main updateWeather function
export async function updateWeather(location) {
  if (!location) return null;
  try {
    showLoadingIcon();
    const data = await api.getWeatherData(location);
    hideLoadingIcon();
    displayCurrentWeather(data);
    await displayFutureWeather(location);
  } catch (error) {
    // hideLoadingIcon();
    setText(els.location, 'Could not find this Location.');
    console.error('Error fetching weather details:', error);
  }
}

// Initialize
createFutureWeatherCards();
updateWeather('Riga, Latvia')
