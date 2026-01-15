# Design Decisions & Refactoring Log

**Date:** January 2026
**Branch:** refactor/milesai-premium
**Agent:** Jules (Senior Frontend Architect)

## 1. Visual Identity Overhaul

### Color Palette
Moved away from generic Bootstrap colors (#007bff, #dc3545) to a custom Fintech Premium palette:
- **Primary:** Slate (#1e293b) - Communicates trust, professionalism, and "black card" exclusivity.
- **Secondary:** Teal (#0d9488) - Differentiates from the sea of blue fintechs, representing growth and optimization.
- **Accent:** Amber (#b45309) - Used sparingly for "Value" and "Premium" indicators (Gold/Points).
- **Backgrounds:** Strictly "Light Mode" with warm neutrals (Stone scale) to avoid clinical stark white.

### Typography
- **Headings:** `Satoshi` - A modern geometric sans-serif that feels tech-forward but distinct.
- **Body:** `General Sans` - Highly legible, neutral, perfect for density of information.
- **Mono:** `JetBrains Mono` - Retained for financial data/points calculations to emphasize precision.

## 2. Component Refactoring

### Removal of "Prototype Indicators"
- **Placeholders:** Replaced literal `[Card Image]` text with a stylized HTML/SVG placeholder component (`.card-image-placeholder`).
- **Emojis:** Removed all emojis from headers (`🔥`, `🤖`, `🗺️`) in favor of clean SVG icons (Lucide style) via `.section-title` component. This elevates the brand from "Notion doc" to "SaaS Product".

### Urgency & Copy
- **Badges:** Redesigned "CRITICAL" (Red) badges to "Expiring Soon" (Amber/Slate) to reduce anxiety-inducing patterns.
- **Tone:** Shifted copy from "Hype/Marketing" ("Revolutionary", "Free") to "Direct/Empowering" ("Optimization", "$0 Cost", "Strategy").

## 3. Technical Constraints
- **Unsplash:** Removed random `source.unsplash.com` links which introduced visual noise and lack of curation. Replaced with clean placeholders.
- **CSS Variables:** Enforced strict usage of `--space-*` and `--color-*` variables to ensure consistency.

## 4. Pending Items
- **Award Map:** Currently using a CSS/SVG simulation. Future iteration requires a JS mapping library integration (Mapbox GL JS recommended).
- **Images:** Real assets need to be sourced as per `IMAGES_REQUIRED.md`.
