# Ebook Cover Images

Professional ebook covers following brand guidelines.

## Design Template

All ebook covers must follow this exact template:

**Dimensions:** 800x1200px (2:3 book cover ratio) @2x = 1600x2400px
**Format:** WebP (85% quality) + PNG fallback (90% quality)

**Layout Structure:**
```
┌─────────────────────────┐
│  Top 20%: Icon          │  ← Lucide icon (white, 128px)
│  + spacing              │
├─────────────────────────┤
│  Middle 50%:            │  ← Title: Satoshi Bold 72px
│  Title + Subtitle       │  ← Subtitle: General Sans 24px
├─────────────────────────┤
│  Bottom 20%:            │  ← Gold bar (4px) + Author
│  Accent bar + Author    │  ← General Sans 18px
└─────────────────────────┘

Background: Navy #1e293b (solid)
Padding: 60px all sides
```

## Required Covers (5 total)

### 1. Award Flight Mastery
- **Filename:** `award-flight-mastery-800x1200@2x.{webp,png}`
- **Icon:** `<i data-lucide="plane">`
- **Title:** "Award Flight Mastery"
- **Subtitle:** "Book business & first class flights using points"
- **Author:** "MilesAI Team"

### 2. Credit Card Optimization
- **Filename:** `credit-card-optimization-800x1200@2x.{webp,png}`
- **Icon:** `<i data-lucide="credit-card">`
- **Title:** "Credit Card Optimization"
- **Subtitle:** "Build the perfect card portfolio for maximum points"

### 3. Hotel Status Shortcut
- **Filename:** `hotel-status-shortcut-800x1200@2x.{webp,png}`
- **Icon:** `<i data-lucide="building">`
- **Title:** "Hotel Status Shortcut"
- **Subtitle:** "Fast-track to elite hotel status with insider strategies"

### 4. Manufactured Spending Blueprint
- **Filename:** `manufactured-spending-blueprint-800x1200@2x.{webp,png}`
- **Icon:** `<i data-lucide="refresh-cw">`
- **Title:** "Manufactured Spending Blueprint"
- **Subtitle:** "Scale your points earning beyond organic spend"

### 5. Ultimate Points Maximizer
- **Filename:** `ultimate-points-maximizer-800x1200@2x.{webp,png}`
- **Icon:** `<i data-lucide="trophy">`
- **Title:** "Ultimate Points Maximizer"
- **Subtitle:** "Advanced strategies for 500K+ points per year"

## Color Specifications

```css
Background: #1e293b (Navy)
Title text: #ffffff (White)
Subtitle text: rgba(255, 255, 255, 0.9)
Gold accent bar: #ca8a04 (4px height)
Author text: rgba(255, 255, 255, 0.8)
```

## Production

**Option 1: Figma/Sketch** (Recommended)
- Create template once
- Duplicate for each ebook
- Export @2x as PNG, convert to WebP

**Option 2: Canva Pro**
- Use 1600x2400px custom size
- Brand kit with exact colors
- Export as PNG, convert to WebP

**Option 3: Adobe Illustrator**
- Vector template for maximum flexibility
- Export at 2x resolution

**Tool for WebP conversion:**
```bash
# Using cwebp (libwebp)
cwebp -q 85 input.png -o output.webp
```

## File Size Targets
- WebP: <400KB each
- PNG: <800KB each
