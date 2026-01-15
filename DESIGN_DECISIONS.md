# MilesAI Expansion Refactor - Design Decisions

## Objectives
- Establish a premium fintech aesthetic (calm, credible, data-forward).
- Remove urgency-heavy styling and reduce visual noise.
- Consolidate CSS/JS to improve maintainability.

## Key Decisions

### 1) Visual System
- **Palette:** Slate primary with teal secondary, amber accent, neutral background range.
- **Typography:** Satoshi for display, General Sans for body, JetBrains Mono for numeric data.
- **Shadows:** Neutral-only shadows to avoid promotional feel.
- **Radius:** Systemized radii (4–16px) to introduce hierarchy.

### 2) Component Hierarchy
- **Cards:** Three tiers (featured, default, subtle) to create hierarchy.
- **Buttons:** Solid primary, bordered secondary, ghost tertiary.
- **Badges:** Informational rather than alarmist.

### 3) Copy & Tone
- **Headlines:** Metrics-first, outcome-driven.
- **CTA Text:** Specific actions (e.g., “Review member results”, “Book best option”).
- **Urgency:** Countdown timers update every 60s and use neutral styling.

### 4) Architecture
- **CSS:** Consolidated into `design-tokens.css`, `components.css`, `layouts.css`, `utilities.css`.
- **JS:** Consolidated into `utils.js`, `components.js`, `feeds.js`, `calculators.js`.
- **Icons:** Lucide-style inline SVGs (no emojis) rendered via `data-icon`.
