import { fetchJson } from '../utils.js';

const grid = document.getElementById('scanner-cards');

const render = (data) => {
  grid.innerHTML = data.supported_cards.map((card) => `
    <article class="card">
      <h3 class="card__title">${card.name}</h3>
      <p class="card__subtitle">${card.issuer} • ${card.network}</p>
      <div class="scanner-card__benefits">
        ${card.benefits.map((benefit) => `<span class="list__item">${benefit}</span>`).join('')}
      </div>
      <footer class="card__footer">
        <button class="btn btn-secondary">Add to Wallet</button>
      </footer>
    </article>
  `).join('');
};

fetchJson('../data/card-scanner.json').then(render);
