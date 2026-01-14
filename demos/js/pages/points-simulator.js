import { fetchJson, formatNumber } from '../utils.js';

const grid = document.getElementById('simulator-grid');

const render = (data) => {
  grid.innerHTML = data.scenarios.map((scenario) => `
    <article class="card">
      <header class="card__header">
        <div>
          <h3 class="card__title">${scenario.title}</h3>
          <p class="card__subtitle">${scenario.mode} mode • ${scenario.time_limit_months} months</p>
        </div>
        <span class="badge badge--success">${scenario.mode}</span>
      </header>
      <div class="simulator-card__meta">
        <p><strong>Goal:</strong> ${scenario.goal}</p>
        <p><strong>Starting points:</strong> ${formatNumber(scenario.starting_points)}</p>
        <p><strong>Monthly spend:</strong> $${formatNumber(scenario.monthly_spend)}</p>
        <p><strong>Target:</strong> ${formatNumber(scenario.target_points)} points</p>
        <p><strong>Cards:</strong> ${scenario.cards.join(', ')}</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-primary">Start Challenge</button>
        <button class="btn btn-secondary">View Rules</button>
      </footer>
    </article>
  `).join('');
};

fetchJson('../data/points-simulator.json').then(render);
