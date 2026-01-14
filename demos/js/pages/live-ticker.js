import { fetchJson } from '../utils.js';

const ticker = document.getElementById('ticker');

const render = (data) => {
  const track = document.createElement('div');
  track.className = 'ticker__track';
  const items = [...data.ticker_items, ...data.ticker_items];

  items.forEach((item) => {
    const span = document.createElement('span');
    span.className = 'ticker__item';
    span.innerHTML = `<strong>${item.icon}</strong> ${item.text}`;
    track.appendChild(span);
  });

  ticker.appendChild(track);
};

fetchJson('../data/ticker-updates.json').then(render);
