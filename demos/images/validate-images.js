#!/usr/bin/env node

/**
 * Image Validation Script for MilesAI
 * Checks which images are present vs. required per IMAGES_REQUIRED.md
 */

const fs = require('fs');
const path = require('path');

// Required images per IMAGES_REQUIRED.md specifications
const requiredImages = {
  core: [
    'landing-hero-1920x1080@2x.webp',
    'landing-hero-1920x1080@2x.png',
    'dashboard-viz-1440x900@2x.webp',
    'dashboard-viz-1440x900@2x.png',
  ],
  tools: [
    'cash-vs-points-800x600@2x.webp',
    'cash-vs-points-800x600@2x.png',
    'award-checker-1200x800@2x.webp',
    'award-checker-1200x800@2x.png',
    'cpp-calculator-600x400@2x.webp',
    'cpp-calculator-600x400@2x.png',
  ],
  'ebooks/covers': [
    'award-flight-mastery-800x1200@2x.webp',
    'award-flight-mastery-800x1200@2x.png',
    'credit-card-optimization-800x1200@2x.webp',
    'credit-card-optimization-800x1200@2x.png',
    'hotel-status-shortcut-800x1200@2x.webp',
    'hotel-status-shortcut-800x1200@2x.png',
    'manufactured-spending-blueprint-800x1200@2x.webp',
    'manufactured-spending-blueprint-800x1200@2x.png',
    'ultimate-points-maximizer-800x1200@2x.webp',
    'ultimate-points-maximizer-800x1200@2x.png',
  ],
  courses: [
    'award-booking-bootcamp-1920x1080@2x.webp',
    'award-booking-bootcamp-1920x1080@2x.png',
    'advanced-churning-masterclass-1920x1080@2x.webp',
    'advanced-churning-masterclass-1920x1080@2x.png',
    'zero-to-500k-course-1920x1080@2x.webp',
    'zero-to-500k-course-1920x1080@2x.png',
  ],
  evergreen: [
    'daily-tip-widget-600x400@2x.webp',
    'daily-tip-widget-600x400@2x.png',
    'hacks-library-1200x800@2x.webp',
    'hacks-library-1200x800@2x.png',
    'quick-guides-800x600@2x.webp',
    'quick-guides-800x600@2x.png',
  ],
  news: [
    'hot-deals-flash-400x300@2x.webp',
    'hot-deals-flash-400x300@2x.png',
    'card-universe-1200x600@2x.webp',
    'card-universe-1200x600@2x.png',
    'transfer-bonus-tracker-1000x600@2x.webp',
    'transfer-bonus-tracker-1000x600@2x.png',
    'community-wins-800x800@2x.webp',
    'community-wins-800x800@2x.png',
    'market-pulse-weekly-1200x800@2x.webp',
    'market-pulse-weekly-1200x800@2x.png',
  ],
  feeds: [
    'deal-alerts-600x400@2x.webp',
    'deal-alerts-600x400@2x.png',
    'live-ticker-1400x200@2x.webp',
    'live-ticker-1400x200@2x.png',
    'program-updates-800x600@2x.webp',
    'program-updates-800x600@2x.png',
    'success-stories-1200x800@2x.webp',
    'success-stories-1200x800@2x.png',
  ],
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

function checkImages() {
  console.log(`\n${colors.blue}╔═══════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  MilesAI Image Validation Report                         ║${colors.reset}`);
  console.log(`${colors.blue}╚═══════════════════════════════════════════════════════════╝${colors.reset}\n`);

  let totalRequired = 0;
  let totalPresent = 0;
  let categoryResults = {};

  Object.keys(requiredImages).forEach((category) => {
    const categoryPath = path.join(__dirname, category);
    const images = requiredImages[category];
    const presentImages = [];
    const missingImages = [];

    images.forEach((image) => {
      totalRequired++;
      const imagePath = path.join(categoryPath, image);
      if (fs.existsSync(imagePath)) {
        presentImages.push(image);
        totalPresent++;
      } else {
        missingImages.push(image);
      }
    });

    categoryResults[category] = {
      required: images.length,
      present: presentImages.length,
      missing: missingImages.length,
      missingList: missingImages,
    };
  });

  // Print category-by-category results
  Object.keys(categoryResults).forEach((category) => {
    const result = categoryResults[category];
    const percentage = Math.round((result.present / result.required) * 100);
    const statusColor = percentage === 100 ? colors.green : percentage > 0 ? colors.yellow : colors.red;
    const statusIcon = percentage === 100 ? '✓' : percentage > 0 ? '◐' : '✗';

    console.log(`${statusColor}${statusIcon} ${category.padEnd(20)}${colors.reset} ${result.present}/${result.required} (${percentage}%)`);

    if (result.missing > 0) {
      result.missingList.forEach((img) => {
        console.log(`  ${colors.gray}⊢ ${img}${colors.reset}`);
      });
    }
  });

  // Print summary
  const overallPercentage = Math.round((totalPresent / totalRequired) * 100);
  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}SUMMARY:${colors.reset} ${totalPresent}/${totalRequired} images present (${overallPercentage}%)\n`);

  if (totalPresent === totalRequired) {
    console.log(`${colors.green}✓ All images are present! Ready for production.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.yellow}⚠ ${totalRequired - totalPresent} images missing.${colors.reset}`);
    console.log(`${colors.gray}  See IMAGES_REQUIRED.md for production specifications.${colors.reset}\n`);
    process.exit(1);
  }
}

// Run validation
try {
  checkImages();
} catch (error) {
  console.error(`${colors.red}Error running validation:${colors.reset}`, error.message);
  process.exit(1);
}
