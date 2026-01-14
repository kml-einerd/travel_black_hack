import { fetchJson, formatCurrency } from '../utils.js';

const container = document.getElementById('trip-comparison');

const render = (data) => {
  container.innerHTML = `
    <article class="card trip-summary">
      <h2 class="card__title">${data.trip}</h2>
      <table class="table">
        <thead>
          <tr><th>Option</th><th>Cost</th><th>CPP</th><th>Rating</th></tr>
        </thead>
        <tbody>
          ${data.options.map((option) => `
            <tr>
              <td>${option.type}</td>
              <td>${option.cost ? formatCurrency(option.cost) : `${option.points}K + ${formatCurrency(option.cash ?? 0)}`}</td>
              <td>${option.cpp ?? '-'}</td>
              <td>${option.rating}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="notice">
        Recommendation: ${data.recommendation.title} • Savings ${formatCurrency(data.recommendation.savings)} (${data.recommendation.savings_percent}%)
      </div>
      <div class="feed-item__actions">
        <button class="btn btn-primary">Book Best Option</button>
        <button class="btn btn-secondary">Save Comparison</button>
      </div>
    </article>
  `;
};

fetchJson('../data/trip-comparison.json').then(render);
