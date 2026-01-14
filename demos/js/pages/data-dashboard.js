import { fetchJson, formatNumber, formatCurrency } from '../utils.js';

const container = document.getElementById('dashboard');

const render = (data) => {
  const pointsTable = `
    <table class="table">
      <thead>
        <tr><th>Program</th><th>Value (¢)</th><th>Trend</th></tr>
      </thead>
      <tbody>
        ${data.points_values.map((item) => `
          <tr>
            <td>${item.program}</td>
            <td>${item.value.toFixed(2)}</td>
            <td>${item.trend}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const heatmap = `
    <table class="table">
      <thead>
        <tr><th>Route</th><th>Economy</th><th>Business</th><th>First</th><th>Trend</th></tr>
      </thead>
      <tbody>
        ${data.heatmap.map((row) => `
          <tr>
            <td>${row.route}</td>
            <td>${row.economy}</td>
            <td>${row.business}</td>
            <td>${row.first}</td>
            <td>${row.trend}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = `
    <div class="dashboard-grid">
      <article class="card">
        <h3 class="card__title">Points Values (CPP)</h3>
        ${pointsTable}
      </article>
      <article class="card">
        <h3 class="card__title">Transfer Bonuses</h3>
        <p><strong>${data.transfer_bonuses.active}</strong> active bonuses</p>
        <p>Best: ${data.transfer_bonuses.best}</p>
        <p>Ending soon: ${data.transfer_bonuses.ending_soon}</p>
        <button class="btn btn-secondary">View All Bonuses</button>
      </article>
      <article class="card">
        <h3 class="card__title">Deal Activity</h3>
        <p><strong>${data.deal_activity.total}</strong> deals today</p>
        <p>Transfer: ${data.deal_activity.breakdown.transfer}</p>
        <p>Card offers: ${data.deal_activity.breakdown.card}</p>
        <p>Award availability: ${data.deal_activity.breakdown.award}</p>
        <p>Mistake fares: ${data.deal_activity.breakdown.mistake}</p>
        <p class="card__meta">Hottest: ${data.deal_activity.hottest}</p>
      </article>
      <article class="card">
        <h3 class="card__title">Availability Heatmap</h3>
        ${heatmap}
      </article>
      <article class="card">
        <h3 class="card__title">Community Pulse</h3>
        <p>Active users now: ${formatNumber(data.community_pulse.active_users)}</p>
        <p>DPs today: ${formatNumber(data.community_pulse.dps_today)}</p>
        <p>Awards booked today: ${formatNumber(data.community_pulse.awards_today)}</p>
        <p>Total value redeemed: ${formatCurrency(data.community_pulse.value_redeemed_today)}</p>
      </article>
    </div>
  `;
};

fetchJson('../data/data-dashboard.json').then(render);
