import { fetchJson } from '../utils.js';

const rail = document.getElementById('story-rail');
const viewer = document.getElementById('story-viewer');

let stories = [];
let activeStory = null;

const renderStory = (story) => {
  viewer.innerHTML = '';
  activeStory = story;

  story.slides.forEach((slide, index) => {
    const panel = document.createElement('div');
    panel.className = `story-slide ${slide.background_color ? 'story-slide--light' : ''}`;
    if (slide.background_image) {
      panel.style.backgroundImage = `url(${slide.background_image})`;
    } else if (slide.background_color) {
      panel.style.background = slide.background_color;
    }
    panel.innerHTML = `
      <div>
        <h3>${slide.headline}</h3>
        ${slide.subtext ? `<p>${slide.subtext}</p>` : ''}
        ${slide.bullets ? `<ul>${slide.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul>` : ''}
        ${slide.footer ? `<p>${slide.footer}</p>` : ''}
      </div>
      <button class="btn btn-primary">${slide.cta?.text ?? 'Learn More'}</button>
      <p class="card__meta">Slide ${index + 1} of ${story.slides.length}</p>
    `;
    viewer.appendChild(panel);
  });
};

const renderRail = () => {
  rail.innerHTML = '';
  stories.forEach((story) => {
    const chip = document.createElement('button');
    chip.className = `story-chip ${story.is_new ? 'story-chip--new' : ''}`;
    chip.innerHTML = `<span>${story.icon}</span><strong>${story.title}</strong>`;
    chip.addEventListener('click', () => renderStory(story));
    rail.appendChild(chip);
  });

  if (stories.length) {
    renderStory(stories[0]);
  }
};

fetchJson('../data/stories.json').then((data) => {
  stories = data.stories;
  renderRail();
});
