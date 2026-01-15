# IMAGES_REQUIRED.md

**Project:** MilesAI - Travel Black Hack
**Design Phase:** Post-Refactor Image Specifications
**Color Palette:** Navy #1e293b, Teal #0d9488, Gold #ca8a04
**Date:** January 2026

---

## Image Philosophy

All images must communicate **trust, credibility, and premium fintech sophistication**. This is not a consumer social media app - every visual element reinforces our positioning as a professional financial optimization platform for serious travel hackers.

### Core Principles
1. **No Stock Photography Clichés**: No handshake photos, generic business people, or cheesy "success" poses
2. **Real Data, Real Screenshots**: Authentic airline booking interfaces, actual credit card offers, legitimate award charts
3. **Warm Neutrals**: Stone palette (#fafaf9 to #1c1917) backgrounds, natural lighting
4. **Subtle Branding**: Navy/Teal/Gold accent usage, never overwhelming
5. **High Resolution**: Minimum 2x retina (@2x), ideally @3x for critical hero images

---

## 1. CORE PAGES (Priority 1)

### 1.1 Landing Page Hero (`demos/index.html`)
**Dimensions:** 1920x1080px (16:9 landscape)
**Format:** WebP with PNG fallback
**Subject:** Premium airline cabin interior (business/first class)
**Composition:**
- Left-weighted rule of thirds
- Visible seat with tray table displaying:
  - Premium metal credit cards (Chase Sapphire Reserve, Amex Platinum)
  - Passport with visible stamps
  - Boarding pass showing business class designation
  - Mobile device displaying MilesAI dashboard
- Warm cabin lighting, golden hour feel
- Shallow depth of field (f/2.8), subject in focus, background soft blur

**Color Grading:**
- Warm tones: amber/gold highlights matching --color-accent
- Navy leather seat upholstery matching --color-primary
- Teal accent lighting (LED mood strips) matching --color-secondary
- Avoid purple/violet/blue gradients entirely

**Post-Production:**
- Subtle vignette (10% opacity)
- Slight film grain (2% for texture)
- Contrast: +15%, Saturation: -5% (refined, not oversaturated)
- Sharpening: 80% (crisp but not over-processed)

**Technical:**
- Export: 1920x1080 @2x = 3840x2160 source
- Compression: WebP 85% quality, PNG fallback 90% quality
- File size target: <500KB WebP, <1.5MB PNG

---

### 1.2 Dashboard (`demos/dashboard/index.html`)
**Dimensions:** 1440x900px (8:5 wide screen)
**Format:** SVG or WebP
**Subject:** Abstract data visualization mockup
**Composition:**
- Clean, minimal geometric shapes
- Navy (#1e293b) background
- Teal (#0d9488) and Gold (#ca8a04) data points/lines
- Subtle grid system visible (8pt grid)
- No gradients - solid colors only

**Style:**
- Flat design with subtle shadows (--shadow-sm)
- Modern fintech aesthetic (think Stripe, Plaid)
- Tabular numerics for point values
- Clean sans-serif labels (General Sans)

**Technical:**
- Vector preferred (SVG)
- If raster: @2x export, WebP 90% quality
- File size: <200KB

---

## 2. TOOLS CATEGORY (Priority 2)

### 2.1 Cash vs Points Calculator (`demos/calculators/cash-vs-points.html`)
**Dimensions:** 800x600px (4:3)
**Format:** PNG or WebP
**Subject:** Split-screen comparison visual
**Composition:**
- Left: Cash payment (credit card, dollar bills)
- Right: Points redemption (airline miles, hotel points card)
- Clean dividing line (2px solid --color-primary)
- Professional product photography style
- White/stone background

**Lighting:**
- Soft, diffused studio lighting
- No harsh shadows
- Even illumination across frame

**Technical:**
- @2x export: 1600x1200
- File size: <300KB

---

### 2.2 Award Availability Checker (`demos/tools/award-availability-checker.html`)
**Dimensions:** 1200x800px (3:2)
**Format:** WebP
**Subject:** Airline booking calendar screenshot (real UI)
**Composition:**
- Actual United/BA/ANA award search interface
- Highlight available dates with teal accent
- Blur personal information (confirmation numbers, names)
- Crop to focus on calendar grid

**Authenticity:**
- Must be real airline interface screenshot
- Captured at actual booking resolution
- No mockups or illustrations

**Technical:**
- Screenshot source: 1920x1280 minimum
- Downscale to 1200x800 @2x with bicubic interpolation
- File size: <400KB

---

### 2.3 CPP Calculator (`demos/calculators/cpp-calculator.html`)
**Dimensions:** 600x400px (3:2 small)
**Format:** WebP
**Subject:** Calculator interface mockup
**Composition:**
- Navy background
- Gold highlights for value calculations
- Monospace font (JetBrains Mono) for numeric display
- Clean, minimal design

**Style:**
- Inspired by financial terminal aesthetics
- High contrast for readability
- Grid-aligned elements

**Technical:**
- @2x: 1200x800
- File size: <150KB

---

## 3. EBOOKS CATEGORY (Priority 2)

### 3.1 Ebook Covers (All 5 Ebooks)
**Dimensions:** 800x1200px (2:3 book cover ratio)
**Format:** WebP with PNG fallback
**Subjects:**
- Award Flight Mastery: Airplane tail with sunset
- Credit Card Optimization: Stack of premium metal cards
- Hotel Status Shortcut: Luxury hotel lobby
- Manufactured Spending Blueprint: Secure vault/safe imagery
- Ultimate Points Maximizer: Abstract geometric point constellation

**Design System:**
- Navy background (#1e293b)
- Title in Satoshi Bold, white color
- Subtitle in General Sans, rgba(255,255,255,0.9)
- Gold accent bar (4px) at bottom
- Lucide icon relevant to topic (white, 128px)

**Typography:**
- Title: Satoshi, 700 weight, 72px
- Subtitle: General Sans, 400 weight, 24px
- Author: General Sans, 500 weight, 18px

**Layout:**
- Top 20%: Icon + spacing
- Middle 50%: Title + subtitle
- Bottom 20%: Gold accent bar + author
- Padding: 60px all sides

**Technical:**
- @2x export: 1600x2400
- WebP 85%, PNG 90%
- File size: <400KB each

---

## 4. COURSES CATEGORY (Priority 2)

### 4.1 Course Hero Images
**Dimensions:** 1920x1080px (16:9)
**Format:** WebP
**Subjects:**
- Award Booking Bootcamp: Multiple browser tabs showing award searches
- Advanced Churning Masterclass: Credit card portfolio spreadsheet
- Zero to 500K Course: Progress chart showing point accumulation

**Style:**
- Screenshot-based (real interfaces)
- Navy overlay with 70% opacity
- White text overlay (Satoshi Bold 96px)
- Teal accent underline (8px height)

**Technical:**
- @2x: 3840x2160
- File size: <600KB

---

## 5. EVERGREEN CONTENT (Priority 3)

### 5.1 Daily Tip Widget (`demos/evergreen/daily-tip-widget.html`)
**Dimensions:** 600x400px (3:2)
**Format:** SVG or WebP
**Subject:** Lightbulb illustration (Lucide style)
**Composition:**
- Minimalist line art
- Navy stroke (#1e293b)
- Gold fill for "lit" bulb (#ca8a04)
- Transparent background

**Technical:**
- Vector (SVG) preferred
- If raster: @2x WebP 90%
- File size: <50KB

---

### 5.2 Hacks Library (`demos/evergreen/hacks-library.html`)
**Dimensions:** 1200x800px (3:2)
**Format:** WebP
**Subject:** Tool/wrench iconography with data overlays
**Style:**
- Isometric illustration style
- Navy/Teal/Gold palette
- Clean, geometric shapes

**Technical:**
- @2x: 2400x1600
- File size: <350KB

---

### 5.3 Quick Guides (`demos/evergreen/quick-guides.html`)
**Dimensions:** 800x600px (4:3)
**Format:** WebP
**Subject:** Open book with travel imagery
**Style:**
- Flat design illustration
- Warm neutral background (--neutral-50)
- Navy book cover, gold bookmark

**Technical:**
- @2x: 1600x1200
- File size: <250KB

---

## 6. NEWS CATEGORY (Priority 3)

### 6.1 Hot Deals Flash Feed
**Dimensions:** 400x300px (4:3 thumbnail)
**Format:** WebP
**Subject:** Lightning bolt icon + countdown timer UI
**Style:**
- Dynamic, energetic composition
- Teal accent for urgency
- Solid backgrounds only (no gradients)

**Technical:**
- @2x: 800x600
- File size: <150KB

---

### 6.2 Card Universe Feed
**Dimensions:** 1200x600px (2:1 wide)
**Format:** WebP
**Subject:** Credit card lineup (real cards)
**Composition:**
- 5-7 premium cards arranged diagonally
- Professional product photography
- White background with soft shadow

**Technical:**
- @2x: 2400x1200
- File size: <400KB

---

### 6.3 Transfer Bonus Tracker
**Dimensions:** 1000x600px (5:3)
**Format:** WebP
**Subject:** Data table visualization
**Style:**
- Clean spreadsheet aesthetic
- Navy header row
- Teal highlight for bonus percentages
- Gold for "insane value" markers

**Technical:**
- @2x: 2000x1200
- File size: <250KB

---

### 6.4 Community Wins
**Dimensions:** 800x800px (1:1 square)
**Format:** WebP
**Subject:** Trophy/medal iconography
**Style:**
- Celebratory but professional
- Gold trophy (--color-accent)
- Navy background
- Minimal, not cheesy

**Technical:**
- @2x: 1600x1600
- File size: <300KB

---

### 6.5 Market Pulse Weekly
**Dimensions:** 1200x800px (3:2)
**Format:** WebP
**Subject:** Financial charts/graphs
**Style:**
- Line charts, bar graphs
- Navy/Teal/Gold data visualization
- Clean, Bloomberg Terminal aesthetic

**Technical:**
- @2x: 2400x1600
- File size: <350KB

---

## 7. FEEDS CATEGORY (Priority 3)

### 7.1 Deal Alerts
**Dimensions:** 600x400px (3:2)
**Format:** WebP
**Subject:** Bell notification icon
**Style:**
- Lucide bell icon style
- Navy with teal accent
- Alert badge (small gold circle)

**Technical:**
- @2x: 1200x800
- File size: <100KB

---

### 7.2 Live Ticker
**Dimensions:** 1400x200px (7:1 banner)
**Format:** WebP
**Subject:** Scrolling news ticker aesthetic
**Style:**
- Dark navy background
- White text (General Sans)
- Red "LIVE" indicator
- Pulse animation frame

**Technical:**
- @2x: 2800x400
- File size: <200KB

---

### 7.3 Program Updates
**Dimensions:** 800x600px (4:3)
**Format:** WebP
**Subject:** Megaphone icon with update badge
**Style:**
- Lucide megaphone
- Navy/Teal palette
- Gold "NEW" badge

**Technical:**
- @2x: 1600x1200
- File size: <150KB

---

### 7.4 Success Stories
**Dimensions:** 1200x800px (3:2)
**Format:** WebP
**Subject:** Trophy with confetti (subtle, not tacky)
**Style:**
- Professional celebration aesthetic
- Gold trophy
- Minimal confetti particles (geometric shapes)
- Navy background

**Technical:**
- @2x: 2400x1600
- File size: <300KB

---

## IMAGE PRODUCTION GUIDELINES

### Color Accuracy
- Use Adobe RGB or sRGB color profile
- Calibrated monitor required for editing
- Navy #1e293b: RGB(30, 41, 59)
- Teal #0d9488: RGB(13, 148, 136)
- Gold #ca8a04: RGB(202, 138, 4)

### File Naming Convention
```
{category}-{page-slug}-{descriptor}-{size}.{ext}

Examples:
- core-landing-hero-1920x1080@2x.webp
- ebooks-award-flight-mastery-cover-800x1200@2x.png
- tools-cpp-calculator-interface-600x400@2x.webp
```

### Directory Structure
```
/demos/images/
├── core/
│   ├── landing-hero-1920x1080@2x.webp
│   └── dashboard-viz-1440x900@2x.webp
├── tools/
│   ├── cash-vs-points-800x600@2x.webp
│   └── award-checker-1200x800@2x.webp
├── ebooks/
│   ├── covers/
│   │   ├── award-flight-mastery-800x1200@2x.webp
│   │   └── ... (5 total)
├── courses/
│   └── ... (3 course heroes)
├── evergreen/
│   └── ... (3 widget images)
├── news/
│   └── ... (5 feed images)
└── feeds/
    └── ... (4 feed images)
```

### Optimization Pipeline
1. Edit in full resolution (source)
2. Export @3x for critical images
3. Downscale to @2x with bicubic interpolation
4. Convert to WebP (85% quality)
5. Generate PNG fallback (90% quality)
6. Optimize with ImageOptim or Squoosh
7. Verify file sizes meet targets

### Accessibility
- Alt text specification in HTML
- Descriptive filenames
- Sufficient contrast for overlay text
- No essential information in images alone (text alternative required)

---

## PRODUCTION PRIORITIES

**Phase 1 (Immediate):**
1. Landing page hero
2. Dashboard visualization
3. 5 Ebook covers

**Phase 2 (Week 2):**
1. 7 Tool page images
2. 3 Course heroes

**Phase 3 (Week 3):**
1. 3 Evergreen images
2. 5 News category images
3. 4 Feeds category images

---

## BUDGET & TIMELINE

**Option A: Stock Photography + Editing**
- Cost: ~$500-1000 (Adobe Stock, Shutterstock premium)
- Timeline: 1 week
- Quality: 7/10 (limited customization)

**Option B: Custom Photography + Design**
- Cost: ~$2000-3500 (photographer + designer)
- Timeline: 2-3 weeks
- Quality: 9/10 (fully custom, brand-aligned)

**Option C: Hybrid (Stock + Heavy Customization)**
- Cost: ~$1200-1800
- Timeline: 1.5-2 weeks
- Quality: 8/10 (best balance)

**Recommended:** Option C - Hybrid approach with heavy color grading and composition adjustments to match fintech aesthetic.

---

**END OF SPECIFICATION**
Version: 1.0
Author: Claude (Senior Product Designer)
Review Required: Creative Director approval before production
