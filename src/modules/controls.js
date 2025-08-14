import { updateWeather } from './uiChanges.js';
let notImperial = true;

const locationInput = document.querySelector('[data-location-input]');
const darkBtn = document.querySelector('[data-dark]');
const lightBtn = document.querySelector('[data-light]');
const dropdownBar = document.querySelector('[data-hb]');
const lightElements = document.querySelectorAll('.light');

// Toggles element hidden and visible state
function toggleElement(element, attribute,  bool = true) {
  if (bool) {
    element.classList.toggle(attribute);
  } else {
    element.style.display === 'flex'
      ? (element.style.display = 'none')
      : (element.style.display = 'flex');
  }
}

function toggleDisplayTheme() {
  lightElements.forEach((el) => {
    el.classList.toggle('dark');
  });
}

// Event delegation for header element
function headerEventDelegation() {
  const header = document.querySelector('header');

  header.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('[data-light]') || target.closest('[data-dark]')) {
      toggleElement(lightBtn, 'hidden');
      toggleElement(darkBtn, 'hidden');
      toggleDisplayTheme();
    } else if (target.closest('[data-hamburger]')) {
      toggleElement(dropdownBar, null, false);
    } else if (target.closest('[data-search-location]')) {
      updateWeather(locationInput.value);
    }
  });
}

// Closes hamburger bar if it is open and click event happens any where else on page
function closeHamburgerBar() {
  window.addEventListener('click', (event) => {
    if (
      !event.target.closest('[data-hamburger]') &&
      !event.target.closest('[data-hb]')
    ) {
      dropdownBar.style.display = 'none';
    }
  });
}

function changeActiveDegree() {
  const celsius = document.querySelector('[data-c]');
  const fahrenheit = document.querySelector('[data-f]');

  celsius.addEventListener('click', () => {
    notImperial = true;
    toggleActiveClassLists(celsius, fahrenheit);
  });
  fahrenheit.addEventListener('click', () => {
    notImperial = false;
    toggleActiveClassLists(fahrenheit, celsius);
  });
}

function toggleActiveClassLists(active, inactive) {
  active.classList.add('active');
  active.classList.remove('inactive');
  inactive.classList.add('inactive');
  inactive.classList.remove('active');
  !locationInput.value
    ? updateWeather('London, England')
    : updateWeather(locationInput.value);
}

export function currentMeasurement() {
  return notImperial;
}



changeActiveDegree();
updateWeather('London, England');
closeHamburgerBar();
headerEventDelegation();
