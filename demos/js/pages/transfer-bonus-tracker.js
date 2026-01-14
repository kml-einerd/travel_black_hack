import { fetchJson, formatDate, valueRatingClass } from '../utils.js';

const bonusGrid = document.getElementById('bonus-grid');
const predictionGrid = document.getElementById('prediction-grid');

const render = (data) => {
  data.active_bonuses.forEach((bonus) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <header class="card__header">
        <div>
          <h3 class="card__title">${bonus.from_program} → ${bonus.to_program}</h3>
          <p class="card__subtitle">Expires ${formatDate(bonus.expires_at)}</p>
        </div>
        <span class="badge ${valueRatingClass(bonus.value_rating)}">${bonus.value_rating}</span>
      </header>
      <div class="bonus-card__logos">
        <img src="${bonus.from_logo}" alt="${bonus.from_program} logo" />
        <img src="${bonus.to_logo}" alt="${bonus.to_program} logo" />
      </div>
      <div class="card__body">
        <p><strong>Bonus:</strong> +${bonus.bonus_percent}%</p>
        <p><strong>Min transfer:</strong> ${bonus.min_transfer}</p>
        <p><strong>Best use:</strong> ${bonus.best_use}</p>
        <p class="card__meta">${bonus.terms}</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-secondary">Calculate Value</button>
        <button class="btn btn-primary">Set Alert</button>
      </footer>
    `;
    bonusGrid.appendChild(card);
  });

  data.upcoming_predictions.forEach((prediction) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3 class="card__title">${prediction.from} → ${prediction.to}</h3>
      <div class="card__body">
        <p><strong>Predicted bonus:</strong> ${prediction.predicted_bonus}%</p>
        <p><strong>Confidence:</strong> ${prediction.confidence}%</p>
        <p><strong>Expected:</strong> ${prediction.expected_date}</p>
        <p class="card__meta">${prediction.basis}</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-ghost">Track Prediction</button>
      </footer>
    `;
    predictionGrid.appendChild(card);
  });
};

fetchJson('../data/transfer-bonuses.json').then(render);
