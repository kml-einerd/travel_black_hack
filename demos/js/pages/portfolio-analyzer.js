import { fetchJson, formatCurrency } from '../utils.js';

const container = document.getElementById('portfolio');

const render = (data) => {
  container.innerHTML = `
    <div class="grid grid--2">
      <article class="card">
        <h3 class="card__title">Portfolio Summary</h3>
        <p><strong>Total value:</strong> ${formatCurrency(data.summary.total_value)}</p>
        <p><strong>Average earning:</strong> ${data.summary.earning_rate}¢</p>
        <p><strong>Monthly change:</strong> ${formatCurrency(data.summary.monthly_change)}</p>
      </article>
      <article class="card">
        <h3 class="card__title">Health Scores</h3>
        ${data.scores.map((score) => `
          <div class="score-bar">
            <div class="card__meta">${score.label} (${score.value}%)</div>
            <div class="progress"><div class="progress__fill" style="width:${score.value}%"></div></div>
          </div>
        `).join('')}
      </article>
      <article class="card">
        <h3 class="card__title">Alerts</h3>
        <ul class="list">
          ${data.alerts.map((alert) => `<li class="list__item">${alert}</li>`).join('')}
        </ul>
      </article>
      <article class="card">
        <h3 class="card__title">Recommended Actions</h3>
        <ul class="list">
          ${data.recommendations.map((rec) => `<li class="list__item">${rec}</li>`).join('')}
        </ul>
      </article>
    </div>
  `;
};

fetchJson('../data/portfolio-analyzer.json').then(render);
