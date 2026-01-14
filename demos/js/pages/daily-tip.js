import { fetchJson, formatDate } from '../utils.js';

const container = document.getElementById('daily-tip');

const render = (data) => {
  const tip = data.daily_tips[0];
  container.innerHTML = `
    <article class="card daily-tip-card">
      <div class="daily-tip-card__icon">${tip.icon}</div>
      <div>
        <h2 class="card__title">${formatDate(tip.date)}</h2>
        <p>${tip.tip}</p>
        <div class="feed-item__actions">
          ${tip.action ? `<button class="btn btn-primary">${tip.action.text}</button>` : ''}
          <button class="btn btn-secondary">Enable Push</button>
        </div>
      </div>
    </article>
  `;
};

fetchJson('../data/daily-tips.json').then(render);
