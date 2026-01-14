import { fetchJson, formatCurrency } from '../utils.js';

const page = document.querySelector('[data-course]');
const container = document.getElementById('course-detail');

const render = (course) => {
  container.innerHTML = `
    <section class="page__hero course-hero">
      <div>
        <p class="badge badge--important">Course</p>
        <h1 class="page__hero-title">${course.title}</h1>
        <p class="page__hero-description">${course.tagline}</p>
        <div class="tag-list">
          <span class="tag">${course.duration_hours} hours</span>
          <span class="tag">${course.lessons} lessons</span>
          <span class="tag">${course.price === 0 ? 'Free' : formatCurrency(course.price)}</span>
        </div>
        <div class="feed-item__actions">
          <button class="btn btn-primary">${course.price === 0 ? 'Enroll Free' : `Enroll for ${formatCurrency(course.price)}`}</button>
          <button class="btn btn-secondary">Preview Lessons</button>
        </div>
      </div>
      <div class="card">
        <h3 class="card__title">Course Format</h3>
        <p>${course.format}</p>
        <div class="course-modules">
          ${course.modules.map((module) => `<div class="list__item">${module}</div>`).join('')}
        </div>
      </div>
    </section>
  `;
};

fetchJson('../data/courses.json').then((data) => {
  const course = data.courses.find((item) => item.slug === page.dataset.course);
  if (course) render(course);
});
