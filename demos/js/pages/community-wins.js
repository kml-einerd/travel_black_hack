import { fetchJson, formatCurrency, formatDate } from '../utils.js';

const grid = document.getElementById('community-grid');

const render = (data) => {
  data.stories.forEach((story) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <header class="card__header">
        <div class="community__user">
          <img src="${story.user.avatar}" alt="${story.user.username}" />
          <div>
            <h3 class="card__title">@${story.user.username}</h3>
            <p class="card__subtitle">Posted ${formatDate(story.posted_at)}</p>
          </div>
        </div>
        <span class="badge badge--success">${story.type.replace('_', ' ')}</span>
      </header>
      <img class="card__image" src="${story.images ? story.images[0] : story.image}" alt="Community win" />
      <div class="card__body">
        <p>${story.story ?? story.summary}</p>
        <div class="tag-list">
          ${(story.tips ?? []).map((tip) => `<span class="tag">${tip}</span>`).join('')}
        </div>
        ${story.redemption ? `
          <p><strong>${story.redemption.cabin}</strong> • ${story.redemption.program_used}</p>
          <p><strong>Cash value:</strong> ${formatCurrency(story.redemption.cash_value)}</p>
        ` : ''}
      </div>
      <footer class="card__footer">
        <span class="card__meta">❤️ ${story.engagement?.likes ?? 0} • 💬 ${story.engagement?.comments ?? 0}</span>
        <button class="btn btn-ghost">Share</button>
      </footer>
    `;
    grid.appendChild(card);
  });
};

fetchJson('../data/community-stories.json').then(render);
