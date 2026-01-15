# Core Images

High-priority hero images for main pages.

## Required Images

### 1. Landing Page Hero
**Filename:** `landing-hero-1920x1080@2x.webp` (primary), `landing-hero-1920x1080@2x.png` (fallback)
**Dimensions:** 1920x1080px @2x = 3840x2160px source
**Subject:** Premium airline cabin interior (business/first class)

**Composition:**
- Left-weighted rule of thirds
- Visible seat with tray table displaying:
  - Premium metal credit cards (Chase Sapphire Reserve, Amex Platinum)
  - Passport with visible stamps
  - Boarding pass showing business class
  - Mobile device with MilesAI dashboard
- Warm cabin lighting (golden hour feel)
- Shallow depth of field (f/2.8)

**Color Grading:**
- Warm tones: amber/gold highlights (#ca8a04)
- Navy leather seat (#1e293b)
- Teal accent lighting (#0d9488)
- NO purple/violet/blue gradients

**File Size:**
- WebP: <500KB
- PNG: <1.5MB

---

### 2. Dashboard Visualization
**Filename:** `dashboard-viz-1440x900@2x.webp`, `dashboard-viz-1440x900@2x.png`
**Dimensions:** 1440x900px @2x = 2880x1800px source
**Subject:** Abstract data visualization mockup

**Composition:**
- Clean geometric shapes
- Navy background (#1e293b)
- Teal (#0d9488) and Gold (#ca8a04) data points
- 8pt grid system visible
- Flat design, subtle shadows only

**Style:**
- Modern fintech (Stripe, Plaid aesthetic)
- No gradients
- Tabular numerics for point values

**File Size:**
- WebP/PNG: <200KB (vector preferred - SVG)

---

## Usage in HTML

```html
<!-- Landing page hero -->
<picture>
  <source srcset="images/core/landing-hero-1920x1080@2x.webp" type="image/webp">
  <img src="images/core/landing-hero-1920x1080@2x.png"
       alt="Premium travel experience with credit cards"
       class="hero__image">
</picture>

<!-- Dashboard viz -->
<picture>
  <source srcset="images/core/dashboard-viz-1440x900@2x.webp" type="image/webp">
  <img src="images/core/dashboard-viz-1440x900@2x.png"
       alt="Points portfolio visualization"
       class="dashboard__viz">
</picture>
```

## Production Notes

- Hire professional photographer for cabin shots OR use premium stock (Adobe Stock)
- Dashboard viz can be created in Figma/Illustrator (export as SVG preferred)
- Color correction essential: Match exact hex values
- Test on retina displays before finalizing
