export const createBadge = (label, className = 'badge--neutral') => {
  const span = document.createElement('span');
  span.className = `badge ${className}`;
  span.textContent = label;
  return span;
};

export const createRating = (value = 0) => {
  const rating = document.createElement('div');
  rating.className = 'rating';
  const stars = Math.round(value);
  rating.innerHTML = `${'★'.repeat(stars)}${'☆'.repeat(Math.max(5 - stars, 0))} ${value.toFixed(1)}`;
  return rating;
};

export const createStat = (label, value) => {
  const stat = document.createElement('div');
  stat.className = 'stat';
  stat.innerHTML = `<div class="stat__label">${label}</div><div class="stat__value">${value}</div>`;
  return stat;
};
