import { fetchJson, formatCurrency } from '../utils.js';

const page = document.querySelector('[data-ebook]');
const container = document.getElementById('ebook-detail');

const render = (ebook) => {
  container.innerHTML = `
    <section class="page__hero">
      <div class="ebook-hero">
        <div>
          <p class="badge badge--important">Ebook</p>
          <h1 class="page__hero-title">${ebook.title}</h1>
          <p class="page__hero-description">${ebook.subtitle}</p>
          <div class="tag-list">
            <span class="tag">${ebook.pages} pages</span>
            <span class="tag">${ebook.audience}</span>
            <span class="tag">${formatCurrency(ebook.price)}</span>
          </div>
          <div class="feed-item__actions">
            <button class="btn btn-primary">Purchase for ${formatCurrency(ebook.price)}</button>
            <button class="btn btn-secondary">Preview Chapter</button>
          </div>
        </div>
        <img src="${ebook.image}" alt="${ebook.title} cover" />
      </div>
    </section>
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">What's Inside</h2>
      </div>
      <div class="card ebook-highlights">
        ${ebook.highlights.map((item) => `<div class="list__item">${item}</div>`).join('')}
      </div>
    </section>
  `;
};

fetchJson('../data/ebooks.json').then((data) => {
  const ebook = data.ebooks.find((item) => item.slug === page.dataset.ebook);
  if (ebook) render(ebook);
});
