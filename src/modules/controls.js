const headerEl = {
  locationInput: document.querySelector('[data-location-input]'),
  searchBtn: document.querySelector('[data-search-location]'),
}

function toggleBetweenStates(element1, element2) {
  document.querySelector(element1).classList.toggle('hidden');
  document.querySelector(element2).classList.toggle('hidden');
}
function toggleDisplayState(element) {
  const el = document.querySelector(element);
  el.style.display === 'flex' ? el.style.display = 'none' : el.style.display = 'flex';
}

document.querySelectorAll('.theme-btn')
  .forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleBetweenStates('[data-light]', '[data-dark]')
    });
});
document.querySelector('[data-hamburger]')
  .addEventListener('click', () => {
    toggleDisplayState('[data-hb]');
  });