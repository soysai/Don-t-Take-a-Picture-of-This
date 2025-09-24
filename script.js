const API_BASE =
  (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://127.0.0.1:3002'                      // local dev
    : 'https://page-counter-api.onrender.com';     // <-- your Render URL

const pageviewsCount = document.getElementById('pageviews-count');
const sufEl = document.getElementById('pageviews-suffix');

if (sessionStorage.getItem('visit') === null) {
  updateCounter('type=visit-pageview');
} else {
  updateCounter('type=pageview');
}

function ordinalSuffix(n){
  const v = n % 100;
  if (v >= 11 && v <= 13) return 'th';
  switch (n % 10){ case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; }
}

function updateCounter(type){
  fetch(`${API_BASE}/api?${type}`)
    .then(r => r.json())
    .then(d => {
      const n = Number(d.pageviews) || 0;
      pageviewsCount.textContent = n;
      sufEl.textContent = ordinalSuffix(n);
    })
    .catch(err => console.error('counter fetch failed:', err));
}

sessionStorage.setItem('visit','x');

