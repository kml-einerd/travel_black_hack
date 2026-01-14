import { fetchJson, formatDate } from '../utils.js';

const feed = document.getElementById('changelog-feed');

const renderChanges = (label, items = []) => {
  if (!items.length) return '';
  return `
    <div class="changelog-section">
      <h4>${label}</h4>
      <ul class="list">
        ${items.map((item) => `<li class="list__item">${item}</li>`).join('')}
      </ul>
    </div>
  `;
};

const render = (data) => {
  feed.innerHTML = data.changelogs.map((log) => `
    <article class="card changelog-card">
      <header class="card__header">
        <div>
          <h3 class="card__title">${log.program_icon} ${log.program}</h3>
          <p class="card__subtitle">v${log.version} • ${formatDate(log.date)}</p>
        </div>
        <span class="badge badge--important">${log.impact_score ?? 'info'}</span>
      </header>
      ${renderChanges('✅ Added', log.changes.added)}
      ${renderChanges('🔄 Changed', log.changes.changed)}
      ${renderChanges('⚠️ Deprecated', log.changes.deprecated)}
      ${renderChanges('❌ Removed', log.changes.removed)}
      <footer class="card__footer">
        <span class="card__meta">👁 ${log.engagement?.views ?? 0} • 💬 ${log.engagement?.comments ?? 0}</span>
        <button class="btn btn-ghost">Subscribe</button>
      </footer>
    </article>
  `).join('');
};

fetchJson('../data/changelog.json').then(render);
