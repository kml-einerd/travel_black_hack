import { fetchJson } from '../utils.js';

const programFilter = document.getElementById('program-filter');
const cabinFilter = document.getElementById('cabin-filter');
const map = document.getElementById('award-map');

let routes = [];

const render = () => {
  const cabin = cabinFilter.value;
  const filtered = routes.filter((route) => cabin === 'all' || route.cabin === cabin);

  map.innerHTML = `
    <h3 class="card__title">Sample Routes</h3>
    <table class="table">
      <thead>
        <tr><th>From</th><th>To</th><th>Points</th><th>Value</th></tr>
      </thead>
      <tbody>
        ${filtered.map((route) => `
          <tr>
            <td>${route.from}</td>
            <td>${route.to}</td>
            <td>${route.points}K</td>
            <td>${route.value}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

fetchJson('../data/award-map.json').then((data) => {
  routes = data.routes;
  programFilter.innerHTML = `<option value="all">All programs</option>` +
    data.programs.map((program) => `<option value="${program}">${program}</option>`).join('');
  cabinFilter.innerHTML = `<option value="all">All cabins</option>` +
    data.cabins.map((cabin) => `<option value="${cabin}">${cabin}</option>`).join('');
  render();
});

cabinFilter.addEventListener('change', render);
programFilter.addEventListener('change', render);
