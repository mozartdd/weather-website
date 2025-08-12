import * as api from './apiCall.js' 

const headerEl = {
  lightBtn: document.querySelector('[data-light]'),
  darkBtn: document.querySelector('[data-dark]'),
  stateBtn: document.querySelectorAll('.theme-btn'),

  locationInput: document.querySelector('[data-location-input]'),
  searchBtn: document.querySelector('[data-search-location]'),
}

const mainEl = {
  time: document.querySelector('[data-time]'),
  currentTemp: document.querySelector('[data-curr-temp] p:first-child'),
  currForecast: document.querySelector('[data-curr-forecast]'),
  feelsLike: document.querySelector('[data-feels-like]'),
  description: document.querySelector('[data-description]'),
  location: document.querySelector('[data-location')
}

function toggleBetweenStates() {
  headerEl.lightBtn.classList.toggle('hidden');
  headerEl.darkBtn.classList.toggle('hidden');
}

headerEl.stateBtn.forEach((btn) => {
  btn.addEventListener('click', toggleBetweenStates);
})

async function displayCurrentData(location) {
  const data = await api.getWeatherData(location);

  mainEl.time.textContent = data.currentTime;
  mainEl.currentTemp.textContent = data.tempC;
  mainEl.currForecast.textContent = data.conditions;
  mainEl.feelsLike.textContent += data.feelsLikeC;
  mainEl.description.textContent = data.description;
  mainEl.location.textContent = data.address;
}

displayCurrentData('Grimsby, UK');
