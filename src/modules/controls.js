import { updateWeather } from './uiChanges.js';
let notImperial = true;
let currActiveLocation = 'Riga, Latvia';

// Grouped selectors
const els = {
  locationInput: document.querySelector('[data-location-input]'),
  darkBtn: document.querySelector('[data-dark]'),
  lightBtn: document.querySelector('[data-light]'),
  dropdownBar: document.querySelector('[data-hb]'),
  lightElements: document.querySelectorAll('.light'),
  header: document.querySelector('header'),
  celsius: document.querySelector('[data-c]'),
  fahrenheit: document.querySelector('[data-f]'),
  darkIcon: document.querySelectorAll('.dark-icon'),
  lightIcon: document.querySelectorAll('.light-icon')

};

// Toggles element hidden and visible state
function toggleElement(element, className, bool = true) {
  if (bool) {
    element.classList.toggle(className);
  } else {
    element.style.display === 'flex'
      ? (element.style.display = 'none')
      : (element.style.display = 'flex');
  }
}

function toggleDisplayTheme() {
  els.lightElements.forEach((el) => {
    el.classList.toggle('dark');
  });
}

// Event delegation for header element
function headerEventDelegation() {
  els.header.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('[data-light]') || target.closest('[data-dark]')) {
      toggleElement(els.lightBtn, 'hidden');
      toggleElement(els.darkBtn, 'hidden');
      els.darkIcon.forEach((icon) => toggleElement(icon, 'hidden'));
      els.lightIcon.forEach((icon) => toggleElement(icon, 'hidden'));
      toggleDisplayTheme();
    } else if (target.closest('[data-hamburger]')) {
      toggleElement(els.dropdownBar, null, false);
    } else if (target.closest('[data-search-location]')) {
      updateWeather(els.locationInput.value);
      currActiveLocation = els.locationInput.value;
      els.locationInput.value = '';
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
      els.dropdownBar.style.display = 'none';
    }
  });
}

function changeActiveDegree() {
  els.celsius.addEventListener('click', () => {
    notImperial = true;
    toggleActiveClassLists(els.celsius, els.fahrenheit);
  });
  els.fahrenheit.addEventListener('click', () => {
    notImperial = false;
    toggleActiveClassLists(els.fahrenheit, els.celsius);
  });
}

function toggleActiveClassLists(active, inactive) {
  active.classList.add('active');
  active.classList.remove('inactive');
  inactive.classList.add('inactive');
  inactive.classList.remove('active');
  !els.locationInput.value
    ? updateWeather(currActiveLocation)
    : updateWeather(els.locationInput.value);
}

export function currentMeasurement() {
  return notImperial;
}

changeActiveDegree();
closeHamburgerBar();
headerEventDelegation();