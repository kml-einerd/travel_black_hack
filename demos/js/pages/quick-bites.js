import { fetchJson, formatTime } from '../utils.js';

const feed = document.getElementById('quick-bites-feed');
const filter = document.getElementById('bite-filter');

let bites = [];

const render = () => {
  feed.innerHTML = '';
  bites
    .filter((bite) => filter.value === 'all' || bite.type === filter.value)
    .forEach((bite) => {
      const card = document.createElement('article');
      card.className = 'quick-bite';
      card.innerHTML = `
        <div class="quick-bite__header">
          <span class="badge badge--important">${bite.title}</span>
          <span class="card__meta">${formatTime(bite.timestamp)}</span>
        </div>
        <p>${bite.content}</p>
        <div class="feed-item__actions">
          ${bite.action ? `<button class="btn btn-secondary">${bite.action.text}</button>` : ''}
          <span class="card__meta">👁 ${bite.engagement.views} • 💬 ${bite.engagement.comments ?? 0}</span>
        </div>
      `;
      feed.appendChild(card);
    });
};

fetchJson('../data/quick-bites.json').then((data) => {
  bites = data.quick_bites;
  render();
});

filter.addEventListener('change', render);
