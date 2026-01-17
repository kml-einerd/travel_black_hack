---
description: Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web technologies (React, Tailwind CSS, shadcn/ui)
---

# Web Artifacts Builder

Build powerful frontend claude.ai artifacts with React, Tailwind, and shadcn/ui.

**Stack**: React 18 + TypeScript + Vite + Parcel + Tailwind CSS + shadcn/ui

## Design Guidelines

**Avoid "AI slop"**: No excessive centered layouts, purple gradients, uniform rounded corners, or Inter font.

## Quick Start

### Step 1: Initialize Project
```bash
bash scripts/init-artifact.sh <project-name>
cd <project-name>
```

Creates a configured project with:
- ✅ React + TypeScript (via Vite)
- ✅ Tailwind CSS 3.4.1 with shadcn/ui theming
- ✅ Path aliases (`@/`) configured
- ✅ 40+ shadcn/ui components pre-installed
- ✅ All Radix UI dependencies included

### Step 2: Develop Your Artifact
Edit the generated files to build your artifact.

### Step 3: Bundle to Single HTML
```bash
bash scripts/bundle-artifact.sh
```

Creates `bundle.html` - a self-contained artifact.

### Step 4: Share Artifact
Share the bundled HTML file as an artifact.

## shadcn/ui Components

Available components at: https://ui.shadcn.com/docs/components

Common components:
- Button, Card, Dialog, Dropdown Menu
- Form, Input, Label, Select
- Table, Tabs, Toast
- Sheet, Popover, Command
- And 30+ more...

## Project Structure

```
my-artifact/
├── src/
│   ├── App.tsx          # Main component
│   ├── components/
│   │   └── ui/          # shadcn components
│   └── lib/
│       └── utils.ts     # Utilities
├── index.html
├── tailwind.config.js
└── package.json
```

## Tips

1. **Start simple** - Build incrementally
2. **Use shadcn/ui** - Don't reinvent components
3. **Test locally** - `npm run dev` before bundling
4. **Keep bundles small** - Only import what you need
