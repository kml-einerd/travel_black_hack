import { fetchJson } from '../utils.js';

const container = document.getElementById('alerts');

const render = (data) => {
  const prefs = data.user_alert_preferences;
  container.innerHTML = `
    <div class="grid grid--2">
      <article class="card">
        <h3 class="card__title">Alert Preferences</h3>
        <div class="alerts-grid">
          <p><strong>Favorite routes:</strong> ${prefs.favorite_routes.join(', ')}</p>
          <p><strong>Preferred cabins:</strong> ${prefs.preferred_cabins.join(', ')}</p>
          <p><strong>Programs:</strong> ${prefs.programs_watching.join(', ')}</p>
          <p><strong>Cards:</strong> ${prefs.cards_interested.join(', ')}</p>
          <p><strong>Channels:</strong> ${prefs.alert_channels.join(', ')}</p>
          <p><strong>Quiet hours:</strong> ${prefs.quiet_hours.start} → ${prefs.quiet_hours.end}</p>
        </div>
      </article>
      <article class="card">
        <h3 class="card__title">Alert Types</h3>
        <ul class="list">
          ${data.alert_types.map((type) => `<li class="list__item">${type}</li>`).join('')}
        </ul>
        <button class="btn btn-primary">Create New Alert</button>
      </article>
    </div>
  `;
};

fetchJson('../data/alerts-engine.json').then(render);
