#!/usr/bin/env node

/**
 * SVG Placeholder Generator for MilesAI
 * Creates professional placeholder images with brand colors
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  navy: '#1e293b',
  teal: '#0d9488',
  gold: '#ca8a04',
  stone50: '#fafaf9',
  stone600: '#57534e',
};

function generateSVGPlaceholder(width, height, category, filename) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="${COLORS.navy}"/>

  <!-- Accent stripes -->
  <rect x="0" y="0" width="${width}" height="4" fill="${COLORS.gold}"/>
  <rect x="0" y="${height - 4}" width="${width}" height="4" fill="${COLORS.gold}"/>

  <!-- Icon area (teal circle) -->
  <circle cx="${width / 2}" cy="${height / 2 - 30}" r="40" fill="${COLORS.teal}" opacity="0.3"/>
  <circle cx="${width / 2}" cy="${height / 2 - 30}" r="30" fill="${COLORS.teal}" opacity="0.5"/>

  <!-- Text -->
  <text x="${width / 2}" y="${height / 2 + 40}"
        font-family="'Satoshi', system-ui, sans-serif"
        font-size="24"
        font-weight="700"
        fill="${COLORS.stone50}"
        text-anchor="middle">
    ${category.toUpperCase()}
  </text>

  <text x="${width / 2}" y="${height / 2 + 70}"
        font-family="'General Sans', system-ui, sans-serif"
        font-size="14"
        fill="${COLORS.stone600}"
        text-anchor="middle">
    ${width}×${height} • Placeholder
  </text>

  <text x="${width / 2}" y="${height / 2 + 95}"
        font-family="'General Sans', system-ui, sans-serif"
        font-size="12"
        fill="${COLORS.stone600}"
        text-anchor="middle"
        opacity="0.7">
    ${filename}
  </text>
</svg>`;

  return svg;
}

// Placeholder specifications matching IMAGES_REQUIRED.md
const placeholders = [
  // Core
  { category: 'core', name: 'landing-hero', width: 1920, height: 1080 },
  { category: 'core', name: 'dashboard-viz', width: 1440, height: 900 },

  // Tools
  { category: 'tools', name: 'cash-vs-points', width: 800, height: 600 },
  { category: 'tools', name: 'award-checker', width: 1200, height: 800 },
  { category: 'tools', name: 'cpp-calculator', width: 600, height: 400 },

  // Ebook covers
  { category: 'ebooks/covers', name: 'award-flight-mastery', width: 800, height: 1200 },
  { category: 'ebooks/covers', name: 'credit-card-optimization', width: 800, height: 1200 },
  { category: 'ebooks/covers', name: 'hotel-status-shortcut', width: 800, height: 1200 },
  { category: 'ebooks/covers', name: 'manufactured-spending-blueprint', width: 800, height: 1200 },
  { category: 'ebooks/covers', name: 'ultimate-points-maximizer', width: 800, height: 1200 },

  // Courses
  { category: 'courses', name: 'award-booking-bootcamp', width: 1920, height: 1080 },
  { category: 'courses', name: 'advanced-churning-masterclass', width: 1920, height: 1080 },
  { category: 'courses', name: 'zero-to-500k-course', width: 1920, height: 1080 },

  // Evergreen
  { category: 'evergreen', name: 'daily-tip-widget', width: 600, height: 400 },
  { category: 'evergreen', name: 'hacks-library', width: 1200, height: 800 },
  { category: 'evergreen', name: 'quick-guides', width: 800, height: 600 },

  // News
  { category: 'news', name: 'hot-deals-flash', width: 400, height: 300 },
  { category: 'news', name: 'card-universe', width: 1200, height: 600 },
  { category: 'news', name: 'transfer-bonus-tracker', width: 1000, height: 600 },
  { category: 'news', name: 'community-wins', width: 800, height: 800 },
  { category: 'news', name: 'market-pulse-weekly', width: 1200, height: 800 },

  // Feeds
  { category: 'feeds', name: 'deal-alerts', width: 600, height: 400 },
  { category: 'feeds', name: 'live-ticker', width: 1400, height: 200 },
  { category: 'feeds', name: 'program-updates', width: 800, height: 600 },
  { category: 'feeds', name: 'success-stories', width: 1200, height: 800 },
];

console.log('🎨 Generating SVG placeholders for MilesAI...\n');

let generated = 0;
placeholders.forEach(({ category, name, width, height }) => {
  const categoryPath = path.join(__dirname, category);

  // Ensure directory exists
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
  }

  const filename = `${name}-${width}x${height}@2x.svg`;
  const filepath = path.join(categoryPath, filename);

  const svg = generateSVGPlaceholder(width, height, category.split('/').pop(), filename);

  fs.writeFileSync(filepath, svg);
  console.log(`✓ ${category}/${filename}`);
  generated++;
});

console.log(`\n✅ Generated ${generated} SVG placeholders`);
console.log('📝 Replace with real images as per IMAGES_REQUIRED.md\n');
