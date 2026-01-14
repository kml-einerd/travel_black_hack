import { fetchJson, formatDate } from '../utils.js';

const list = document.getElementById('calendar-list');

const render = (data) => {
  list.innerHTML = data.calendar_events.map((event) => `
    <div class="calendar-event">
      <span class="calendar-event__meta">${event.type} • ${event.color}</span>
      <h3 class="card__title">${event.title}</h3>
      <p>${event.description}</p>
      <p class="card__meta">${formatDate(event.date)} ${event.time ?? ''} ${event.timezone ?? ''}</p>
      ${event.action ? `<button class="btn btn-secondary">${event.action.text}</button>` : ''}
    </div>
  `).join('');
};

fetchJson('../data/calendar-events.json').then(render);
