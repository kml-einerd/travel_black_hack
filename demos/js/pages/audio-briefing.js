import { fetchJson, formatDate } from '../utils.js';

const container = document.getElementById('audio-briefing');

const render = (data) => {
  const briefing = data.audio_briefings[0];
  container.innerHTML = `
    <article class="card audio-player">
      <header>
        <h2 class="card__title">${briefing.title}</h2>
        <p class="card__subtitle">${formatDate(briefing.date)} • ${Math.round(briefing.duration_seconds / 60)} min</p>
      </header>
      <div class="audio-controls">
        <button class="btn btn-primary">Play</button>
        <button class="btn btn-secondary">Transcript</button>
        <button class="btn btn-ghost">Share</button>
      </div>
      <div class="list">
        ${briefing.chapters.map((chapter) => `
          <div class="list__item">
            <strong>${chapter.time}</strong>
            <span>${chapter.icon} ${chapter.title}</span>
          </div>
        `).join('')}
      </div>
      <footer class="card__footer">
        <span class="card__meta">Plays ${briefing.plays} • Likes ${briefing.likes}</span>
      </footer>
    </article>
    <article class="card">
      <h3 class="card__title">Release schedule</h3>
      <p>${data.podcast_config.release_time} • ${data.podcast_config.days.join(', ')}</p>
      <div class="tag-list">
        ${data.podcast_config.available_on.map((platform) => `<span class="tag">${platform}</span>`).join('')}
      </div>
    </article>
  `;
};

fetchJson('../data/audio-briefing.json').then(render);
