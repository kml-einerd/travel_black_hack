import { fetchJson, formatDate } from '../utils.js';
import { createRating } from '../components.js';

const grid = document.getElementById('card-universe-grid');
const issuerFilter = document.getElementById('issuer-filter');
const typeFilter = document.getElementById('type-filter');

let posts = [];

const renderPosts = () => {
  grid.innerHTML = '';
  const filtered = posts.filter((post) => {
    const issuerMatch = issuerFilter.value === 'all' || post.issuer === issuerFilter.value;
    const typeMatch = typeFilter.value === 'all' || post.type === typeFilter.value;
    return issuerMatch && typeMatch;
  });

  filtered.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <header class="card__header">
        <div>
          <h3 class="card__title">${post.title}</h3>
          <p class="card__subtitle">${post.subtitle ?? ''}</p>
        </div>
        <span class="badge badge--info">${post.type.replace('_', ' ')}</span>
      </header>
      <img class="card__image" src="${post.image}" alt="${post.card_name}" />
      <div class="card__body">
        <div class="card-universe__meta">
          <span>${post.card_name}</span>
          <span>${post.issuer}</span>
        </div>
        ${post.welcome_bonus ? `<p><strong>Welcome bonus:</strong> ${post.welcome_bonus}</p>` : ''}
        ${post.highlight ? `<p><strong>Highlight:</strong> ${post.highlight}</p>` : ''}
        ${post.new_benefit ? `<p><strong>Update:</strong> ${post.new_benefit}</p>` : ''}
        ${post.alternative ? `<p><strong>Alternative:</strong> ${post.alternative}</p>` : ''}
        <p class="card__meta">Posted ${formatDate(post.posted_at ?? post.effective_date)}</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-secondary">Compare</button>
        <button class="btn btn-primary">Add to Watchlist</button>
      </footer>
    `;

    if (post.rating) {
      card.querySelector('.card__body').appendChild(createRating(post.rating));
    }

    grid.appendChild(card);
  });
};

const loadPosts = async () => {
  const data = await fetchJson('../data/card-universe.json');
  posts = data.posts;
  renderPosts();
};

issuerFilter.addEventListener('change', renderPosts);
typeFilter.addEventListener('change', renderPosts);

loadPosts();
