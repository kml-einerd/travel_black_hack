import { fetchJson, formatDate, calculateCountdown, getUrgencyBadge } from '../utils.js';

const grid = document.getElementById('hot-deals-grid');
const dealFilter = document.getElementById('deal-filter');
const urgencyFilter = document.getElementById('urgency-filter');
const refreshButton = document.getElementById('refresh-deals');

let deals = [];

const renderDeals = () => {
  grid.innerHTML = '';
  const filtered = deals.filter((deal) => {
    const dealMatch = dealFilter.value === 'all' || deal.category === dealFilter.value;
    const urgencyMatch = urgencyFilter.value === 'all' || deal.priority === urgencyFilter.value;
    return dealMatch && urgencyMatch;
  });

  filtered.forEach((deal) => {
    const badge = getUrgencyBadge(deal.priority);
    const card = document.createElement('article');
    card.className = 'card hot-deals__card';
    card.innerHTML = `
      <header class="card__header">
        <div>
          <span class="badge ${badge.className}">${badge.label}</span>
          <h3 class="card__title">${deal.title}</h3>
          <p class="card__subtitle">Expires ${formatDate(deal.expires)}</p>
        </div>
        <span class="badge badge--neutral">${deal.category.replace('_', ' ')}</span>
      </header>
      <img class="card__image" src="${deal.image}" alt="${deal.title}" />
      <div class="card__body">
        <p><strong>${deal.value}</strong></p>
        <div class="hot-deals__details">
          <span><strong>Requirements:</strong> ${deal.requirements}</span>
          <span><strong>Best for:</strong> ${deal.best_for.join(', ')}</span>
        </div>
        <div class="countdown hot-deals__countdown" data-expires="${deal.expires}">
          <div class="countdown__unit">
            <span class="countdown__value">00</span>
            <span class="countdown__label">hrs</span>
          </div>
          <div class="countdown__unit">
            <span class="countdown__value">00</span>
            <span class="countdown__label">min</span>
          </div>
          <div class="countdown__unit">
            <span class="countdown__value">00</span>
            <span class="countdown__label">sec</span>
          </div>
        </div>
      </div>
      <footer class="card__footer">
        <button class="btn btn-primary">${deal.cta}</button>
        <button class="btn btn-ghost">Save Deal</button>
      </footer>
    `;
    grid.appendChild(card);
  });

  updateCountdowns();
};

const updateCountdowns = () => {
  document.querySelectorAll('[data-expires]').forEach((el) => {
    const { hours, minutes, seconds } = calculateCountdown(el.dataset.expires);
    const values = el.querySelectorAll('.countdown__value');
    if (values.length >= 3) {
      values[0].textContent = String(hours).padStart(2, '0');
      values[1].textContent = String(minutes).padStart(2, '0');
      values[2].textContent = String(seconds).padStart(2, '0');
    }
  });
};

const loadDeals = async () => {
  const data = await fetchJson('../data/hot-deals.json');
  deals = data.hot_deals;
  renderDeals();
};

const init = () => {
  dealFilter.addEventListener('change', renderDeals);
  urgencyFilter.addEventListener('change', renderDeals);
  refreshButton.addEventListener('click', loadDeals);
  loadDeals();
  setInterval(updateCountdowns, 1000);
};

init();
