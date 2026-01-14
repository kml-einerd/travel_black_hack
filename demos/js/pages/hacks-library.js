import { fetchJson, formatNumber } from '../utils.js';

const grid = document.getElementById('hacks-grid');
const search = document.getElementById('hack-search');

let hacks = [];

const render = () => {
  const query = search.value.toLowerCase();
  grid.innerHTML = '';
  hacks
    .filter((hack) => hack.title.toLowerCase().includes(query) || hack.category.includes(query))
    .forEach((hack) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <header class="card__header">
          <div>
            <span class="badge badge--info">Hack #${hack.number}</span>
            <h3 class="card__title">${hack.title}</h3>
          </div>
          <span class="badge badge--neutral">${hack.category.replace('_', ' ')}</span>
        </header>
        <div class="card__body">
          <p>${hack.summary}</p>
          <div class="hack-card__difficulty">Difficulty: ${'★'.repeat(hack.difficulty)}</div>
          <p class="card__meta">Potential value: $${hack.potential_value.min} - $${hack.potential_value.max} / ${hack.potential_value.period}</p>
        </div>
        <footer class="card__footer">
          <span class="card__meta">👁 ${formatNumber(hack.views)} views • ⭐ ${hack.rating}</span>
          <button class="btn btn-secondary">View Steps</button>
        </footer>
      `;
      grid.appendChild(card);
    });
};

fetchJson('../data/hacks.json').then((data) => {
  hacks = data.hacks;
  render();
});

search.addEventListener('input', render);
