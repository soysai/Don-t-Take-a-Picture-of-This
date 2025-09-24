const pageviewsCount = document.getElementById('pageviews-count');
const sufEl = document.getElementById('pageviews-suffix');

if (sessionStorage.getItem('visit') === null) {
  // New visit and pageview
  updateCounter('type=visit-pageview');
} else {
  // Pageview
  updateCounter('type=pageview');
}

function ordinalSuffix(n) {
  const v = n % 100;
  if (v >= 11 && v <= 13) return 'th';   // 11th, 12th, 13th
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function updateCounter(type) {
  fetch('http://127.0.0.1:3002/api?' + type) // Dynamic request with URL parameter
    .then(res => res.json())
    .then(data => {
      const n = Number(data.pageviews) || 0; // <- make sure it's a number
      pageviewsCount.textContent = n;        // Display pageviews to user
      sufEl.textContent = ordinalSuffix(n);  // Add proper suffix
    });
}

sessionStorage.setItem('visit', 'x');
// 'visit' item persists in storage for the remainder of the user session
