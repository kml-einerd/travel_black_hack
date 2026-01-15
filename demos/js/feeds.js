import {
  fetchJson,
  formatCurrency,
  formatDate,
  formatNumber,
  formatTime,
  calculateCountdown,
  getUrgencyBadge,
  valueRatingClass
} from './utils.js';
import { createIcon, hydrateIcons } from './components.js';

const renderHotDeals = async () => {
  const grid = document.getElementById('hot-deals-grid');
  if (!grid) return;
  const dealFilter = document.getElementById('deal-filter');
  const urgencyFilter = document.getElementById('urgency-filter');
  const refreshButton = document.getElementById('refresh-deals');

  let deals = [];

  const updateCountdowns = () => {
    document.querySelectorAll('[data-expires]').forEach((el) => {
      const { hours, minutes } = calculateCountdown(el.dataset.expires);
      el.textContent = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m left`;
    });
  };

  const renderDeals = () => {
    grid.innerHTML = '';
    const filtered = deals.filter((deal) => {
      const dealMatch = dealFilter.value === 'all' || deal.category === dealFilter.value;
      const urgencyMatch = urgencyFilter.value === 'all' || deal.priority === urgencyFilter.value;
      return dealMatch && urgencyMatch;
    });

    filtered.forEach((deal) => {
      const badge = getUrgencyBadge(deal.priority);
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <header class="card__header">
          <div>
            <span class="badge ${badge.className}">${badge.label}</span>
            <h3 class="card__title">${deal.title}</h3>
            <p class="card__subtitle">Expires ${formatDate(deal.expires)}</p>
          </div>
          <span class="badge badge--neutral">${deal.category.replace('_', ' ')}</span>
        </header>
        <img class="card__image" src="${deal.image}" alt="${deal.title}" loading="lazy" onerror="this.src='../imagens/aircraft.svg'" />
        <div class="card__body">
          <p><strong>${deal.value}</strong></p>
          <p class="card__meta">Requirements: ${deal.requirements}</p>
          <p class="card__meta">Best for: ${deal.best_for.join(', ')}</p>
          <div class="countdown" data-expires="${deal.expires}"></div>
        </div>
        <footer class="card__footer">
          <button class="btn btn-primary">${deal.cta}</button>
          <button class="btn btn-secondary">Save to brief</button>
        </footer>
      `;
      grid.appendChild(card);
    });

    updateCountdowns();
  };

  const loadDeals = async () => {
    const data = await fetchJson('../data/hot-deals.json');
    deals = data.hot_deals;
    renderDeals();
  };

  dealFilter.addEventListener('change', renderDeals);
  urgencyFilter.addEventListener('change', renderDeals);
  refreshButton.addEventListener('click', loadDeals);
  await loadDeals();
  setInterval(updateCountdowns, 60000);
};

const renderCardUniverse = async () => {
  const grid = document.getElementById('card-universe-grid');
  if (!grid) return;
  const issuerFilter = document.getElementById('issuer-filter');
  const typeFilter = document.getElementById('type-filter');
  const data = await fetchJson('../data/card-universe.json');
  const posts = data.posts;

  const render = () => {
    grid.innerHTML = '';
    posts
      .filter((post) => (issuerFilter.value === 'all' || post.issuer === issuerFilter.value))
      .filter((post) => (typeFilter.value === 'all' || post.type === typeFilter.value))
      .forEach((post) => {
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
          <img class="card__image" src="${post.image}" alt="${post.card_name}" loading="lazy" />
          <div class="card__body">
            <p><strong>${post.card_name}</strong> • ${post.issuer}</p>
            ${post.welcome_bonus ? `<p>Welcome bonus: ${post.welcome_bonus}</p>` : ''}
            ${post.highlight ? `<p>Highlight: ${post.highlight}</p>` : ''}
            ${post.new_benefit ? `<p>Update: ${post.new_benefit}</p>` : ''}
            ${post.alternative ? `<p>Alternative: ${post.alternative}</p>` : ''}
            <p class="card__meta">Posted ${formatDate(post.posted_at ?? post.effective_date)}</p>
          </div>
          <footer class="card__footer">
            <button class="btn btn-secondary">Compare benefits</button>
            <button class="btn btn-primary">Add to watchlist</button>
          </footer>
        `;
        grid.appendChild(card);
      });
  };

  issuerFilter.addEventListener('change', render);
  typeFilter.addEventListener('change', render);
  render();
};

const renderMarketPulse = async () => {
  const stats = document.getElementById('market-stats');
  if (!stats) return;
  const economyTable = document.getElementById('economy-table');
  const bestRoutes = document.getElementById('best-routes');
  const cardSpotlight = document.getElementById('card-spotlight');
  const devaluationList = document.getElementById('devaluation-list');
  const proTips = document.getElementById('pro-tips');
  const data = await fetchJson('../data/market-pulse.json');

  stats.innerHTML = `
    <div class="card card--subtle">
      <div class="card__title">Issue #${data.issue_number}</div>
      <p class="card__meta">${data.week_start} → ${data.week_end}</p>
    </div>
    <div class="card card--subtle">
      <div class="card__title">Market Change</div>
      <p class="card__meta">${data.points_economy_index.overall_change}</p>
    </div>
  `;

  economyTable.innerHTML = `
    <thead>
      <tr>
        <th>Program</th>
        <th>Value (¢)</th>
        <th>Change</th>
        <th>Trend</th>
      </tr>
    </thead>
    <tbody>
      ${data.points_economy_index.programs.map((program) => `
        <tr>
          <td>${program.name}</td>
          <td>${program.value.toFixed(2)}</td>
          <td>${program.change > 0 ? '+' : ''}${program.change.toFixed(2)}</td>
          <td>${program.trend}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  bestRoutes.innerHTML = data.best_routes.map((route) => `
    <article class="card card--subtle">
      <img class="card__image" src="${route.image}" alt="${route.route}" loading="lazy" />
      <div class="card__body">
        <h4 class="card__title">${route.route}</h4>
        <p>${route.airline} • ${route.cabin}</p>
        <p><strong>${formatNumber(route.points)} points</strong> • CPP ${route.cpp}</p>
      </div>
    </article>
  `).join('');

  cardSpotlight.innerHTML = `
    <img class="card__image" src="${data.card_spotlight.image}" alt="${data.card_spotlight.card}" loading="lazy" />
    <div class="card__body">
      <h4 class="card__title">${data.card_spotlight.card}</h4>
      <p>${data.card_spotlight.verdict}</p>
      <p class="badge badge--accent">Score ${data.card_spotlight.score}</p>
    </div>
  `;

  devaluationList.innerHTML = data.devaluation_watch
    .map((item) => `<div class="list__item"><strong>${item.program}</strong><span>${item.risk} risk — ${item.summary}</span></div>`)
    .join('');

  proTips.innerHTML = data.pro_tips
    .map((tip) => `<div class="list__item">${tip}</div>`)
    .join('');
};

const renderTransferBonuses = async () => {
  const bonusGrid = document.getElementById('bonus-grid');
  if (!bonusGrid) return;
  const predictionGrid = document.getElementById('prediction-grid');
  const data = await fetchJson('../data/transfer-bonuses.json');

  bonusGrid.innerHTML = data.active_bonuses.map((bonus) => `
    <article class="card">
      <header class="card__header">
        <div>
          <h3 class="card__title">${bonus.from_program} → ${bonus.to_program}</h3>
          <p class="card__subtitle">Expires ${formatDate(bonus.expires_at)}</p>
        </div>
        <span class="badge ${valueRatingClass(bonus.value_rating)}">${bonus.value_rating}</span>
      </header>
      <div class="card__body">
        <p><strong>Bonus:</strong> +${bonus.bonus_percent}%</p>
        <p><strong>Min transfer:</strong> ${bonus.min_transfer}</p>
        <p><strong>Best use:</strong> ${bonus.best_use}</p>
        <p class="card__meta">${bonus.terms}</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-secondary">Calculate value</button>
        <button class="btn btn-primary">Set alert</button>
      </footer>
    </article>
  `).join('');

  predictionGrid.innerHTML = data.upcoming_predictions.map((prediction) => `
    <article class="card card--subtle">
      <h3 class="card__title">${prediction.from} → ${prediction.to}</h3>
      <div class="card__body">
        <p>Predicted bonus: ${prediction.predicted_bonus}%</p>
        <p>Confidence: ${prediction.confidence}%</p>
        <p>Expected: ${prediction.expected_date}</p>
        <p class="card__meta">${prediction.basis}</p>
      </div>
    </article>
  `).join('');
};

const renderCommunityWins = async () => {
  const grid = document.getElementById('community-grid');
  if (!grid) return;
  const data = await fetchJson('../data/community-stories.json');
  grid.innerHTML = data.stories.map((story) => `
    <article class="card">
      <header class="card__header">
        <div class="inline-center">
          <img class="card__image" style="width:48px;height:48px;border-radius:50%;" src="${story.user.avatar}" alt="${story.user.username}" loading="lazy" />
          <div>
            <h3 class="card__title">@${story.user.username}</h3>
            <p class="card__subtitle">${formatDate(story.posted_at)}</p>
          </div>
        </div>
        <span class="badge badge--success">${story.type.replace('_', ' ')}</span>
      </header>
      <img class="card__image" src="${story.images ? story.images[0] : story.image}" alt="Community win" loading="lazy" />
      <div class="card__body">
        <p>${story.story ?? story.summary}</p>
        <div class="tag-list">
          ${(story.tips ?? []).map((tip) => `<span class="tag">${tip}</span>`).join('')}
        </div>
        ${story.redemption ? `
          <p><strong>${story.redemption.cabin}</strong> • ${story.redemption.program_used}</p>
          <p><strong>Cash value:</strong> ${formatCurrency(story.redemption.cash_value)}</p>
        ` : ''}
      </div>
      <footer class="card__footer">
        <span class="card__meta">Likes ${story.engagement?.likes ?? 0} • Comments ${story.engagement?.comments ?? 0}</span>
        <button class="btn btn-secondary">Share story</button>
      </footer>
    </article>
  `).join('');
};

const renderLiveTicker = async () => {
  const ticker = document.getElementById('ticker');
  if (!ticker) return;
  const data = await fetchJson('../data/ticker-updates.json');
  const track = document.createElement('div');
  track.className = 'ticker__track';
  const items = [...data.ticker_items, ...data.ticker_items];
  items.forEach((item) => {
    const span = document.createElement('span');
    span.className = 'ticker__item';
    const icon = createIcon(item.icon);
    span.appendChild(icon);
    span.appendChild(document.createTextNode(item.text));
    track.appendChild(span);
  });
  ticker.appendChild(track);
};

const renderNewsHub = async () => {
  const featured = document.getElementById('featured');
  if (!featured) return;
  const trending = document.getElementById('trending');
  const hotDeals = document.getElementById('hot-deals');
  const cardNews = document.getElementById('card-news');
  const awardAvailability = document.getElementById('award-availability');
  const hotelDeals = document.getElementById('hotel-deals');
  const latestGuides = document.getElementById('latest-guides');
  const data = await fetchJson('../data/portal-news.json');

  featured.innerHTML = `
    <article class="card card--featured">
      <img class="card__image" src="${data.featured_story.image}" alt="${data.featured_story.headline}" loading="lazy" />
      <div class="stack-md">
        <span class="badge badge--accent">Featured</span>
        <h2 class="card__title">${data.featured_story.headline}</h2>
        <p class="card__subtitle">${data.featured_story.subheadline}</p>
        <p class="card__meta">${formatDate(data.featured_story.published_at)} • ${data.featured_story.read_time_minutes} min read</p>
      </div>
    </article>
  `;

  trending.innerHTML = `
    <h3 class="card__title">Trending Now</h3>
    <div class="stack-sm">
      ${data.trending.map((item) => `<div class="list__item"><span>#${item.rank} ${item.title}</span><span class="card__meta">${item.views} views</span></div>`).join('')}
    </div>
  `;

  hotDeals.innerHTML = `
    <h3 class="card__title">Hot Deals</h3>
    <div class="stack-sm">
      ${data.hot_deals.map((deal) => `<div class="list__item"><span>${deal.title}</span><span class="card__meta">${deal.expires}</span></div>`).join('')}
    </div>
  `;

  const renderList = (items) => items.map((item) => `<li class="list__item">${item}</li>`).join('');

  cardNews.innerHTML = `<h3 class="card__title">Card News</h3><ul class="list">${renderList(data.card_news)}</ul>`;
  awardAvailability.innerHTML = `<h3 class="card__title">Award Availability</h3><ul class="list">${renderList(data.award_availability)}</ul>`;
  hotelDeals.innerHTML = `<h3 class="card__title">Hotel Deals</h3><ul class="list">${renderList(data.hotel_deals)}</ul>`;
  latestGuides.innerHTML = `<h3 class="card__title">Latest Guides</h3><ul class="list">${renderList(data.latest_guides)}</ul>`;
};

const renderQuickBites = async () => {
  const feed = document.getElementById('quick-bites-feed');
  if (!feed) return;
  const filter = document.getElementById('bite-filter');
  const data = await fetchJson('../data/quick-bites.json');
  const bites = data.quick_bites;

  const render = () => {
    feed.innerHTML = bites
      .filter((bite) => filter.value === 'all' || bite.type === filter.value)
      .map((bite) => `
        <article class="card">
          <header class="card__header">
            <span class="badge badge--info">${bite.title}</span>
            <span class="card__meta">${formatTime(bite.timestamp)}</span>
          </header>
          <div class="card__body">
            <p>${bite.content}</p>
          </div>
          <footer class="card__footer">
            ${bite.action ? `<button class="btn btn-secondary">${bite.action.text}</button>` : '<span></span>'}
            <span class="card__meta">Views ${bite.engagement.views} • Comments ${bite.engagement.comments ?? 0}</span>
          </footer>
        </article>
      `).join('');
  };

  filter.addEventListener('change', render);
  render();
};

const renderStories = async () => {
  const rail = document.getElementById('story-rail');
  const viewer = document.getElementById('story-viewer');
  if (!rail || !viewer) return;
  const data = await fetchJson('../data/stories.json');

  const renderStory = (story) => {
    viewer.innerHTML = story.slides.map((slide, index) => {
      const background = slide.background_image
        ? `style="background-image:url('${slide.background_image}')"`
        : slide.background_color
          ? `style="background:${slide.background_color};"`
          : '';
      const lightClass = slide.background_color ? 'card--subtle' : '';
      return `
        <article class="card ${lightClass}" ${background}>
          <div class="card__body">
            <h3 class="card__title">${slide.headline}</h3>
            ${slide.subtext ? `<p>${slide.subtext}</p>` : ''}
            ${slide.bullets ? `<ul class="list">${slide.bullets.map((bullet) => `<li class="list__item">${bullet}</li>`).join('')}</ul>` : ''}
            ${slide.footer ? `<p class="card__meta">${slide.footer}</p>` : ''}
          </div>
          <footer class="card__footer">
            <button class="btn btn-primary">${slide.cta?.text ?? 'View details'}</button>
            <span class="card__meta">Slide ${index + 1} of ${story.slides.length}</span>
          </footer>
        </article>
      `;
    }).join('');
  };

  rail.innerHTML = data.stories.map((story) => `
    <button class="card" data-story="${story.id}">
      <div class="inline-center">
        <span data-icon="${story.icon}"></span>
        <strong>${story.title}</strong>
      </div>
    </button>
  `).join('');

  rail.querySelectorAll('[data-story]').forEach((button) => {
    button.addEventListener('click', () => {
      const story = data.stories.find((item) => item.id === button.dataset.story);
      if (story) renderStory(story);
    });
  });

  renderStory(data.stories[0]);
};

const renderCalendar = async () => {
  const list = document.getElementById('calendar-list');
  if (!list) return;
  const data = await fetchJson('../data/calendar-events.json');
  list.innerHTML = data.calendar_events.map((event) => `
    <div class="list__item">
      <div>
        <div class="card__meta">${event.type} • ${event.color}</div>
        <h3 class="card__title">${event.title}</h3>
        <p>${event.description}</p>
        <p class="card__meta">${formatDate(event.date)} ${event.time ?? ''} ${event.timezone ?? ''}</p>
      </div>
      ${event.action ? `<button class="btn btn-secondary">${event.action.text}</button>` : ''}
    </div>
  `).join('');
};

const renderChangelog = async () => {
  const feed = document.getElementById('changelog-feed');
  if (!feed) return;
  const data = await fetchJson('../data/changelog.json');

  const renderChanges = (label, items = []) => {
    if (!items.length) return '';
    return `
      <div class="stack-sm">
        <h4>${label}</h4>
        <ul class="list">
          ${items.map((item) => `<li class="list__item">${item}</li>`).join('')}
        </ul>
      </div>
    `;
  };

  feed.innerHTML = data.changelogs.map((log) => `
    <article class="card">
      <header class="card__header">
        <div>
          <h3 class="card__title"><span data-icon="${log.program_icon}"></span> ${log.program}</h3>
          <p class="card__subtitle">v${log.version} • ${formatDate(log.date)}</p>
        </div>
        <span class="badge badge--info">${log.impact_score ?? 'info'}</span>
      </header>
      ${renderChanges('Added', log.changes.added)}
      ${renderChanges('Changed', log.changes.changed)}
      ${renderChanges('Deprecated', log.changes.deprecated)}
      ${renderChanges('Removed', log.changes.removed)}
      <footer class="card__footer">
        <span class="card__meta">Views ${log.engagement?.views ?? 0} • Comments ${log.engagement?.comments ?? 0}</span>
        <button class="btn btn-secondary">Subscribe</button>
      </footer>
    </article>
  `).join('');
};

const renderAudioBriefing = async () => {
  const container = document.getElementById('audio-briefing');
  if (!container) return;
  const data = await fetchJson('../data/audio-briefing.json');
  const briefing = data.audio_briefings[0];

  container.innerHTML = `
    <article class="card">
      <header>
        <h2 class="card__title">${briefing.title}</h2>
        <p class="card__subtitle">${formatDate(briefing.date)} • ${Math.round(briefing.duration_seconds / 60)} min</p>
      </header>
      <div class="stack-sm">
        ${briefing.chapters.map((chapter) => `
          <div class="list__item">
            <span class="card__meta">${chapter.time}</span>
            <span class="inline-center"><span data-icon="${chapter.icon}"></span>${chapter.title}</span>
          </div>
        `).join('')}
      </div>
      <footer class="card__footer">
        <span class="card__meta">Plays ${briefing.plays} • Likes ${briefing.likes}</span>
        <button class="btn btn-primary">Play briefing</button>
      </footer>
    </article>
    <article class="card card--subtle">
      <h3 class="card__title">Release schedule</h3>
      <p>${data.podcast_config.release_time} • ${data.podcast_config.days.join(', ')}</p>
      <div class="tag-list">
        ${data.podcast_config.available_on.map((platform) => `<span class="tag">${platform}</span>`).join('')}
      </div>
    </article>
  `;
};

const renderDataDashboard = async () => {
  const container = document.getElementById('dashboard');
  if (!container) return;
  const data = await fetchJson('../data/data-dashboard.json');

  container.innerHTML = `
    <div class="grid grid--2">
      <article class="card">
        <h3 class="card__title">Points Values (CPP)</h3>
        <table class="table">
          <thead>
            <tr><th>Program</th><th>Value</th><th>Trend</th></tr>
          </thead>
          <tbody>
            ${data.points_values.map((item) => `
              <tr>
                <td>${item.program}</td>
                <td>${item.value.toFixed(2)}¢</td>
                <td>${item.trend}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </article>
      <article class="card">
        <h3 class="card__title">Transfer Bonuses</h3>
        <p><strong>${data.transfer_bonuses.active}</strong> active bonuses</p>
        <p>Best: ${data.transfer_bonuses.best}</p>
        <p>Ending soon: ${data.transfer_bonuses.ending_soon}</p>
        <button class="btn btn-secondary">Review bonuses</button>
      </article>
      <article class="card">
        <h3 class="card__title">Deal Activity</h3>
        <p><strong>${data.deal_activity.total}</strong> deals today</p>
        <p>Transfer bonuses: ${data.deal_activity.breakdown.transfer}</p>
        <p>Card offers: ${data.deal_activity.breakdown.card}</p>
        <p>Award availability: ${data.deal_activity.breakdown.award}</p>
        <p>Mistake fares: ${data.deal_activity.breakdown.mistake}</p>
        <p class="card__meta">Focus: ${data.deal_activity.hottest}</p>
      </article>
      <article class="card">
        <h3 class="card__title">Availability Heatmap</h3>
        <table class="table">
          <thead>
            <tr><th>Route</th><th>Economy</th><th>Business</th><th>First</th><th>Trend</th></tr>
          </thead>
          <tbody>
            ${data.heatmap.map((row) => `
              <tr>
                <td>${row.route}</td>
                <td>${row.economy}</td>
                <td>${row.business}</td>
                <td>${row.first}</td>
                <td>${row.trend}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </article>
      <article class="card">
        <h3 class="card__title">Community Pulse</h3>
        <p>Active users now: ${formatNumber(data.community_pulse.active_users)}</p>
        <p>DPs today: ${formatNumber(data.community_pulse.dps_today)}</p>
        <p>Awards booked today: ${formatNumber(data.community_pulse.awards_today)}</p>
        <p>Total value redeemed: ${formatCurrency(data.community_pulse.value_redeemed_today)}</p>
      </article>
    </div>
  `;
};

const renderHacksLibrary = async () => {
  const grid = document.getElementById('hacks-grid');
  if (!grid) return;
  const search = document.getElementById('hack-search');
  const data = await fetchJson('../data/hacks.json');
  const hacks = data.hacks;

  const render = () => {
    const query = search.value.toLowerCase();
    grid.innerHTML = hacks
      .filter((hack) => hack.title.toLowerCase().includes(query) || hack.category.includes(query))
      .map((hack) => `
        <article class="card">
          <header class="card__header">
            <div>
              <span class="badge badge--info">Hack #${hack.number}</span>
              <h3 class="card__title">${hack.title}</h3>
            </div>
            <span class="badge badge--neutral">${hack.category.replace('_', ' ')}</span>
          </header>
          <div class="card__body">
            <p>${hack.summary}</p>
            <p class="card__meta">Difficulty: Level ${hack.difficulty}</p>
            <p class="card__meta">Potential value: $${hack.potential_value.min} - $${hack.potential_value.max} / ${hack.potential_value.period}</p>
          </div>
          <footer class="card__footer">
            <span class="card__meta">Views ${formatNumber(hack.views)} • Rating ${hack.rating}</span>
            <button class="btn btn-secondary">View steps</button>
          </footer>
        </article>
      `).join('');
  };

  search.addEventListener('input', render);
  render();
};

const renderQuickGuides = async () => {
  const grid = document.getElementById('guides-grid');
  if (!grid) return;
  const data = await fetchJson('../data/quick-guides.json');
  grid.innerHTML = data.guides.map((guide) => `
    <article class="card">
      <header class="card__header">
        <div>
          <h3 class="card__title">${guide.title}</h3>
          <p class="card__subtitle">${guide.read_time} min read • ${guide.level}</p>
        </div>
        <span class="badge badge--info">Guide</span>
      </header>
      <div class="card__body">
        <ol class="list">
          ${guide.steps.map((step) => `<li class="list__item">${step}</li>`).join('')}
        </ol>
        <p><strong>Transfer time:</strong> ${guide.transfer_time}</p>
        <p><strong>Ratio:</strong> ${guide.ratio}</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-secondary">Mark complete</button>
        <button class="btn btn-ghost">Save</button>
      </footer>
    </article>
  `).join('');
};

const renderDailyTip = async () => {
  const container = document.getElementById('daily-tip');
  if (!container) return;
  const data = await fetchJson('../data/daily-tips.json');
  const tip = data.daily_tips[0];
  container.innerHTML = `
    <article class="card">
      <div class="inline-center">
        <span data-icon="${tip.icon}"></span>
        <div>
          <h2 class="card__title">${formatDate(tip.date)}</h2>
          <p>${tip.tip}</p>
        </div>
      </div>
      <footer class="card__footer">
        ${tip.action ? `<button class="btn btn-primary">${tip.action.text}</button>` : ''}
        <button class="btn btn-secondary">Enable reminders</button>
      </footer>
    </article>
  `;
};

const renderEbookLanding = async () => {
  const container = document.getElementById('ebook-detail');
  if (!container) return;
  const slug = document.documentElement.dataset.ebook;
  const data = await fetchJson('../data/ebooks.json');
  const ebook = data.ebooks.find((item) => item.slug === slug);
  if (!ebook) return;

  container.innerHTML = `
    <section class="page__hero">
      <div class="grid grid--2">
        <div class="stack-md">
          <span class="badge badge--accent">Ebook</span>
          <h1 class="page__hero-title">${ebook.title}</h1>
          <p class="page__hero-description">${ebook.subtitle}</p>
          <div class="tag-list">
            <span class="tag">${ebook.pages} pages</span>
            <span class="tag">${ebook.audience}</span>
            <span class="tag">${formatCurrency(ebook.price)}</span>
          </div>
          <div class="inline-center">
            <button class="btn btn-primary">Purchase for ${formatCurrency(ebook.price)}</button>
            <button class="btn btn-secondary">Preview the outline</button>
          </div>
        </div>
        <img class="card__image" src="${ebook.image}" alt="${ebook.title} cover" loading="lazy" />
      </div>
    </section>
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">What's inside</h2>
      </div>
      <div class="card card--subtle">
        ${ebook.highlights.map((item) => `<div class="list__item">${item}</div>`).join('')}
      </div>
    </section>
  `;
};

const renderCourseLanding = async () => {
  const container = document.getElementById('course-detail');
  if (!container) return;
  const slug = document.documentElement.dataset.course;
  const data = await fetchJson('../data/courses.json');
  const course = data.courses.find((item) => item.slug === slug);
  if (!course) return;

  container.innerHTML = `
    <section class="page__hero">
      <div class="grid grid--2">
        <div class="stack-md">
          <span class="badge badge--info">Course</span>
          <h1 class="page__hero-title">${course.title}</h1>
          <p class="page__hero-description">${course.tagline}</p>
          <div class="tag-list">
            <span class="tag">${course.duration_hours} hours</span>
            <span class="tag">${course.lessons} lessons</span>
            <span class="tag">${course.price === 0 ? 'Free' : formatCurrency(course.price)}</span>
          </div>
          <div class="inline-center">
            <button class="btn btn-primary">${course.price === 0 ? 'Start Points 101 free' : `Enroll for ${formatCurrency(course.price)}`}</button>
            <button class="btn btn-secondary">View curriculum</button>
          </div>
        </div>
        <div class="card card--subtle">
          <h3 class="card__title">Course format</h3>
          <p>${course.format}</p>
          <div class="list">
            ${course.modules.map((module) => `<div class="list__item">${module}</div>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
};

const renderAiConcierge = async () => {
  const chat = document.getElementById('chat');
  if (!chat) return;
  const data = await fetchJson('../data/ai-concierge.json');
  const messages = data.sample_conversation
    .map((entry) => `
      <div class="card ${entry.role === 'user' ? 'card--subtle' : ''}">
        <p class="card__meta">${entry.role === 'user' ? 'You' : 'MilesAI'}</p>
        <p>${entry.message}</p>
      </div>
    `).join('');

  chat.innerHTML = `
    <div class="stack-md">${messages}</div>
    <div>
      <h3 class="card__title">Quick prompts</h3>
      <div class="tag-list">
        ${data.quick_prompts.map((prompt) => `<span class="tag">${prompt}</span>`).join('')}
      </div>
    </div>
    <div class="inline-center">
      <input class="input" placeholder="Ask a question about your points" />
      <button class="btn btn-primary">Send question</button>
    </div>
  `;
};

const renderCardScanner = async () => {
  const grid = document.getElementById('scanner-cards');
  if (!grid) return;
  const data = await fetchJson('../data/card-scanner.json');
  grid.innerHTML = data.supported_cards.map((card) => `
    <article class="card">
      <h3 class="card__title">${card.name}</h3>
      <p class="card__subtitle">${card.issuer} • ${card.network}</p>
      <div class="list">
        ${card.benefits.map((benefit) => `<span class="list__item">${benefit}</span>`).join('')}
      </div>
      <footer class="card__footer">
        <button class="btn btn-secondary">Add to wallet</button>
      </footer>
    </article>
  `).join('');
};

const renderPointsSimulator = async () => {
  const grid = document.getElementById('simulator-grid');
  if (!grid) return;
  const data = await fetchJson('../data/points-simulator.json');
  grid.innerHTML = data.scenarios.map((scenario) => `
    <article class="card">
      <header class="card__header">
        <div>
          <h3 class="card__title">${scenario.title}</h3>
          <p class="card__subtitle">${scenario.mode} mode • ${scenario.time_limit_months} months</p>
        </div>
        <span class="badge badge--success">${scenario.mode}</span>
      </header>
      <div class="card__body">
        <p><strong>Goal:</strong> ${scenario.goal}</p>
        <p><strong>Starting points:</strong> ${formatNumber(scenario.starting_points)}</p>
        <p><strong>Monthly spend:</strong> $${formatNumber(scenario.monthly_spend)}</p>
        <p><strong>Target:</strong> ${formatNumber(scenario.target_points)} points</p>
      </div>
      <footer class="card__footer">
        <button class="btn btn-primary">Start scenario</button>
        <button class="btn btn-secondary">View rules</button>
      </footer>
    </article>
  `).join('');
};

const renderAwardMap = async () => {
  const programFilter = document.getElementById('program-filter');
  const cabinFilter = document.getElementById('cabin-filter');
  const map = document.getElementById('award-map');
  if (!programFilter || !cabinFilter || !map) return;
  const data = await fetchJson('../data/award-map.json');
  const routes = data.routes;

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

  programFilter.innerHTML = `<option value="all">All programs</option>` +
    data.programs.map((program) => `<option value="${program}">${program}</option>`).join('');
  cabinFilter.innerHTML = `<option value="all">All cabins</option>` +
    data.cabins.map((cabin) => `<option value="${cabin}">${cabin}</option>`).join('');

  cabinFilter.addEventListener('change', render);
  programFilter.addEventListener('change', render);
  render();
};

const renderPortfolioAnalyzer = async () => {
  const container = document.getElementById('portfolio');
  if (!container) return;
  const data = await fetchJson('../data/portfolio-analyzer.json');
  container.innerHTML = `
    <div class="grid grid--2">
      <article class="card">
        <h3 class="card__title">Portfolio Summary</h3>
        <p><strong>Total value:</strong> ${formatCurrency(data.summary.total_value)}</p>
        <p><strong>Average earning:</strong> ${data.summary.earning_rate}¢</p>
        <p><strong>Monthly change:</strong> ${formatCurrency(data.summary.monthly_change)}</p>
      </article>
      <article class="card">
        <h3 class="card__title">Health Scores</h3>
        ${data.scores.map((score) => `
          <div class="stack-sm">
            <div class="card__meta">${score.label} (${score.value}%)</div>
            <div class="progress"><div class="progress__fill" style="width:${score.value}%"></div></div>
          </div>
        `).join('')}
      </article>
      <article class="card">
        <h3 class="card__title">Alerts</h3>
        <ul class="list">
          ${data.alerts.map((alert) => `<li class="list__item">${alert}</li>`).join('')}
        </ul>
      </article>
      <article class="card">
        <h3 class="card__title">Recommended Actions</h3>
        <ul class="list">
          ${data.recommendations.map((rec) => `<li class="list__item">${rec}</li>`).join('')}
        </ul>
      </article>
    </div>
  `;
};

const renderAlertsEngine = async () => {
  const container = document.getElementById('alerts');
  if (!container) return;
  const data = await fetchJson('../data/alerts-engine.json');
  const prefs = data.user_alert_preferences;
  container.innerHTML = `
    <div class="grid grid--2">
      <article class="card">
        <h3 class="card__title">Alert Preferences</h3>
        <div class="stack-sm">
          <p><strong>Favorite routes:</strong> ${prefs.favorite_routes.join(', ')}</p>
          <p><strong>Preferred cabins:</strong> ${prefs.preferred_cabins.join(', ')}</p>
          <p><strong>Programs:</strong> ${prefs.programs_watching.join(', ')}</p>
          <p><strong>Cards:</strong> ${prefs.cards_interested.join(', ')}</p>
          <p><strong>Channels:</strong> ${prefs.alert_channels.join(', ')}</p>
          <p><strong>Quiet hours:</strong> ${prefs.quiet_hours.start} → ${prefs.quiet_hours.end}</p>
        </div>
      </article>
      <article class="card">
        <h3 class="card__title">Alert Types</h3>
        <ul class="list">
          ${data.alert_types.map((type) => `<li class="list__item">${type}</li>`).join('')}
        </ul>
        <button class="btn btn-primary">Create alert</button>
      </article>
    </div>
  `;
};

const renderTripComparison = async () => {
  const container = document.getElementById('trip-comparison');
  if (!container) return;
  const data = await fetchJson('../data/trip-comparison.json');
  container.innerHTML = `
    <article class="card">
      <h2 class="card__title">${data.trip}</h2>
      <table class="table">
        <thead>
          <tr><th>Option</th><th>Cost</th><th>CPP</th><th>Rating</th></tr>
        </thead>
        <tbody>
          ${data.options.map((option) => `
            <tr>
              <td>${option.type}</td>
              <td>${option.cost ? formatCurrency(option.cost) : `${option.points}K + ${formatCurrency(option.cash ?? 0)}`}</td>
              <td>${option.cpp ?? '-'}</td>
              <td>${option.rating}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="notice">Recommendation: ${data.recommendation.title} • Savings ${formatCurrency(data.recommendation.savings)} (${data.recommendation.savings_percent}%)</div>
      <div class="card__footer">
        <button class="btn btn-primary">Book best option</button>
        <button class="btn btn-secondary">Save comparison</button>
      </div>
    </article>
  `;
};

const init = async () => {
  await renderHotDeals();
  await renderCardUniverse();
  await renderMarketPulse();
  await renderTransferBonuses();
  await renderCommunityWins();
  await renderLiveTicker();
  await renderNewsHub();
  await renderQuickBites();
  await renderStories();
  await renderCalendar();
  await renderChangelog();
  await renderAudioBriefing();
  await renderDataDashboard();
  await renderHacksLibrary();
  await renderQuickGuides();
  await renderDailyTip();
  await renderEbookLanding();
  await renderCourseLanding();
  await renderAiConcierge();
  await renderCardScanner();
  await renderPointsSimulator();
  await renderAwardMap();
  await renderPortfolioAnalyzer();
  await renderAlertsEngine();
  await renderTripComparison();
  hydrateIcons();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});
