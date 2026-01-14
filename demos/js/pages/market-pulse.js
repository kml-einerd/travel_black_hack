import { fetchJson, formatNumber } from '../utils.js';
import { createStat } from '../components.js';

const stats = document.getElementById('market-stats');
const economyTable = document.getElementById('economy-table');
const bestRoutes = document.getElementById('best-routes');
const cardSpotlight = document.getElementById('card-spotlight');
const devaluationList = document.getElementById('devaluation-list');
const proTips = document.getElementById('pro-tips');

const render = (data) => {
  stats.appendChild(createStat('Issue', `#${data.issue_number}`));
  stats.appendChild(createStat('Week', `${data.week_start} → ${data.week_end}`));
  stats.appendChild(createStat('Market Change', data.points_economy_index.overall_change));

  economyTable.innerHTML = `
    <thead>
      <tr>
        <th>Program</th>
        <th>Value (¢)</th>
        <th>Change</th>
        <th>Trend</th>
      </tr>
    </thead>
    <tbody>
      ${data.points_economy_index.programs.map((program) => `
        <tr>
          <td>${program.name}</td>
          <td>${program.value.toFixed(2)}</td>
          <td>${program.change > 0 ? '+' : ''}${program.change.toFixed(2)}</td>
          <td>${program.trend}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  data.best_routes.forEach((route) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="card__image" src="${route.image}" alt="${route.route}" />
      <div class="card__body">
        <h4 class="card__title">${route.route}</h4>
        <p>${route.airline} • ${route.cabin}</p>
        <p><strong>${formatNumber(route.points)} points</strong> • CPP ${route.cpp}</p>
      </div>
    `;
    bestRoutes.appendChild(card);
  });

  cardSpotlight.innerHTML = `
    <img class="card__image" src="${data.card_spotlight.image}" alt="${data.card_spotlight.card}" />
    <div class="card__body">
      <h4 class="card__title">${data.card_spotlight.card}</h4>
      <p>${data.card_spotlight.verdict}</p>
      <div class="rating">★ ${data.card_spotlight.score}</div>
    </div>
  `;

  data.devaluation_watch.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'list__item';
    row.innerHTML = `<strong>${item.program}</strong><span>${item.risk} risk — ${item.summary}</span>`;
    devaluationList.appendChild(row);
  });

  data.pro_tips.forEach((tip) => {
    const row = document.createElement('div');
    row.className = 'list__item';
    row.textContent = tip;
    proTips.appendChild(row);
  });
};

fetchJson('../data/market-pulse.json').then(render);
