import { updateWeather } from './uiChanges.js';

const locationInput = document.querySelector('[data-location-input]');
const searchBtn = document.querySelector('[data-search-location]');
const darkBtn = document.querySelector('[data-dark]');
const lightBtn = document.querySelector('[data-light]');
const dropdownBar = document.querySelector('[data-hb]');

// Toggles element hidden and visible state
function toggleHiddenState(element, bool = true) {
  if (bool) {
    element.classList.toggle('hidden');
  } else {
    element.style.display === 'flex'
      ? (element.style.display = 'none')
      : (element.style.display = 'flex');
  }
}

// Event delegation for header element
function headerEventDelegation() {
  const header = document.querySelector('header');

  header.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('[data-light]') || target.closest('[data-dark]')) {
      toggleHiddenState(lightBtn);
      toggleHiddenState(darkBtn);
    } else if (target.closest('[data-hamburger]')) {
      toggleHiddenState(dropdownBar, false);
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

updateWeather('London UK');
closeHamburgerBar();
headerEventDelegation();
