import { fetchJson } from '../utils.js';

const grid = document.getElementById('guides-grid');

const render = (data) => {
  grid.innerHTML = data.guides.map((guide) => `
    <article class="card guide-card">
      <header class="card__header">
        <div>
          <h3 class="card__title">${guide.title}</h3>
          <p class="card__subtitle">${guide.read_time} min read • ${guide.level}</p>
        </div>
        <span class="badge badge--info">Guide</span>
      </header>
      <div class="card__body">
        <ol class="list">
          ${guide.steps.map((step) => `<li class="list__item">${step}</li>`).join('')}
        </ol>
        <p><strong>Transfer time:</strong> ${guide.transfer_time}</p>
        <p><strong>Ratio:</strong> ${guide.ratio}</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-secondary">Mark Complete</button>
        <button class="btn btn-ghost">Save</button>
      </footer>
    </article>
  `).join('');
};

fetchJson('../data/quick-guides.json').then(render);
