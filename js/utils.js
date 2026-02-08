// ===== SHARED HELPERS =====

function disableSnapScrolling() {
  document.body.classList.add('no-snap');
}

function enableSnapScrolling() {
  document.body.classList.remove('no-snap');
}

// Debounce helper
function debounce(fn, delay = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
