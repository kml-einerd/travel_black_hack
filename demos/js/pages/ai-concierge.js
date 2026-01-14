import { fetchJson } from '../utils.js';

const chat = document.getElementById('chat');

const render = (data) => {
  const messages = data.sample_conversation
    .map((entry) => `
      <div class="chat__bubble ${entry.role === 'user' ? 'chat__bubble--user' : ''}">
        <strong>${entry.role === 'user' ? 'You' : 'MilesAI'}</strong>
        <p>${entry.message}</p>
      </div>
    `).join('');

  chat.innerHTML = `
    ${messages}
    <div>
      <h3 class="card__title">Quick prompts</h3>
      <div class="tag-list">
        ${data.quick_prompts.map((prompt) => `<span class="tag">${prompt}</span>`).join('')}
      </div>
    </div>
    <div class="chat__input">
      <input class="input" placeholder="Ask the concierge..." />
      <button class="btn btn-primary">Send</button>
    </div>
  `;
};

fetchJson('../data/ai-concierge.json').then(render);
