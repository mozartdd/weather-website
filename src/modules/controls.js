const headerEl = {
  locationInput: document.querySelector('[data-location-input]'),
  searchBtn: document.querySelector('[data-search-location]'),
}

function toggleBetweenStates() {
  document.querySelector('[data-light]').classList.toggle('hidden');
  document.querySelector('[data-dark]').classList.toggle('hidden');
}

document.querySelectorAll('.theme-btn')
  .forEach((btn) => {
    btn.addEventListener('click', toggleBetweenStates);
})