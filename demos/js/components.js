export const iconMap = {
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2s4 4.5 4 8.5S13 17 13 21c-2-1-6-3-6-8 0-4 3-8 5-11z"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01"/><path d="M10.29 3.86l-7.4 12.87A2 2 0 0 0 4.6 19h14.8a2 2 0 0 0 1.71-2.27L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>',
  plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 16l20-8-8 20-2-7-7-2z"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 13l3-3 4 4 5-7"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 20l-5-2V4l5 2 6-2 5 2v14l-5-2-6 2z"/><path d="M9 4v16"/><path d="M15 4v16"/></svg>'
};

export const createIcon = (name) => {
  const wrapper = document.createElement('span');
  wrapper.className = 'icon';
  wrapper.innerHTML = iconMap[name] ?? '';
  return wrapper;
};

export const hydrateIcons = () => {
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.dataset.icon;
    el.innerHTML = iconMap[name] ?? '';
    el.classList.add('icon');
  });
};
