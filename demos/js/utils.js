export const fetchJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);

export const formatNumber = (amount) =>
  new Intl.NumberFormat('en-US').format(amount);

export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  }).format(date);
};

export const formatTime = (dateString) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(dateString));

export const calculateCountdown = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = Math.max(target - now, 0);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
};

export const getUrgencyBadge = (urgency) => {
  switch (urgency) {
    case 'critical':
      return { label: 'Ending Soon', className: 'badge--critical' };
    case 'urgent':
      return { label: 'Limited Time', className: 'badge--urgent' };
    default:
      return { label: 'Updated', className: 'badge--important' };
  }
};

export const valueRatingClass = (rating) => {
  const normalized = rating?.toLowerCase?.() ?? 'good';
  if (['excellent', 'insane'].includes(normalized)) return 'badge--success';
  if (['good'].includes(normalized)) return 'badge--important';
  if (['fair'].includes(normalized)) return 'badge--neutral';
  return 'badge--critical';
};
