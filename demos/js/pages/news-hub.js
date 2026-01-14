import { fetchJson, formatDate } from '../utils.js';

const featured = document.getElementById('featured');
const trending = document.getElementById('trending');
const hotDeals = document.getElementById('hot-deals');
const cardNews = document.getElementById('card-news');
const awardAvailability = document.getElementById('award-availability');
const hotelDeals = document.getElementById('hotel-deals');
const latestGuides = document.getElementById('latest-guides');

const renderList = (items) => items.map((item) => `<li class="list__item">${item}</li>`).join('');

const render = (data) => {
  featured.innerHTML = `
    <article class="hero-card">
      <img class="hero-card__image" src="${data.featured_story.image}" alt="${data.featured_story.headline}" />
      <div>
        <span class="badge badge--critical">${data.featured_story.category}</span>
        <h2 class="card__title">${data.featured_story.headline}</h2>
        <p class="card__subtitle">${data.featured_story.subheadline}</p>
        <p class="card__meta">${formatDate(data.featured_story.published_at)} • ${data.featured_story.read_time_minutes} min read</p>
      </div>
    </article>
  `;

  trending.innerHTML = `
    <h3 class="card__title">Trending Now</h3>
    <div class="news-hub__list">
      ${data.trending.map((item) => `
        <div class="news-hub__list-item">
          <span>#${item.rank} ${item.title}</span>
          <span>${item.views} views</span>
        </div>
      `).join('')}
    </div>
  `;

  hotDeals.innerHTML = `
    <h3 class="card__title">🔥 Hot Deals</h3>
    <div class="news-hub__list">
      ${data.hot_deals.map((deal) => `
        <div class="news-hub__list-item">
          <span>${deal.title}</span>
          <span>${deal.expires}</span>
        </div>
      `).join('')}
    </div>
  `;

  cardNews.innerHTML = `
    <h3 class="card__title">💳 Card News</h3>
    <ul class="list">${renderList(data.card_news)}</ul>
  `;

  awardAvailability.innerHTML = `
    <h3 class="card__title">✈️ Award Availability</h3>
    <ul class="list">${renderList(data.award_availability)}</ul>
  `;

  hotelDeals.innerHTML = `
    <h3 class="card__title">🏨 Hotel Deals</h3>
    <ul class="list">${renderList(data.hotel_deals)}</ul>
  `;

  latestGuides.innerHTML = `
    <h3 class="card__title">📚 Latest Guides</h3>
    <ul class="list">${renderList(data.latest_guides)}</ul>
  `;
};

fetchJson('../data/portal-news.json').then(render);
