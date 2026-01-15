# Images Directory

This directory contains all images for the MilesAI demo pages, organized by category.

## Directory Structure

```
images/
├── core/           # Landing page, dashboard hero images
├── tools/          # Calculator and tool page images
├── ebooks/
│   └── covers/     # Ebook cover images (5 total)
├── courses/        # Course hero images (3 total)
├── evergreen/      # Widget and library images
├── news/           # News feed category images
└── feeds/          # Feed page images
```

## Image Specifications

All images must follow the specifications in `/IMAGES_REQUIRED.md`

### Key Requirements:
- **Format**: WebP primary (85% quality), PNG fallback (90% quality)
- **Resolution**: @2x for retina displays
- **Color Palette**: Navy #1e293b, Teal #0d9488, Gold #ca8a04
- **Style**: Professional fintech aesthetic (no stock photography clichés)

## Current Status

Use the validation script to check which images are missing:

```bash
node demos/images/validate-images.js
```

## Adding Images

When adding images:
1. Follow naming convention: `{category}-{page-slug}-{descriptor}-{size}@2x.{ext}`
2. Place in appropriate category folder
3. Ensure both WebP and PNG versions exist
4. Run validation script to confirm

## Image Production

See `/IMAGES_REQUIRED.md` for complete production guidelines including:
- Lighting and composition specs
- Color grading requirements
- Post-production pipeline
- Budget and timeline options
