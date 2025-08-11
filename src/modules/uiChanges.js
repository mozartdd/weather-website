const headerEl = {
  lightBtn: document.querySelector('[data-light]'),
  darkBtn: document.querySelector('[data-dark]'),
  stateBtn: document.querySelectorAll('.theme-btn')
}

function toggleBetweenStates() {
  headerEl.lightBtn.classList.toggle('hidden');
  headerEl.darkBtn.classList.toggle('hidden');
}

headerEl.stateBtn.forEach((btn) => {
  btn.addEventListener('click', toggleBetweenStates);
})
