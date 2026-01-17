---
description: Applies brand colors and typography for consistent visual identity and professional design standards
---

# Brand Guidelines

Apply official brand colors and typography to artifacts for consistent visual identity.

## Colors

### Main Colors
| Name | Hex | Usage |
|------|-----|-------|
| Dark | `#141413` | Primary text, dark backgrounds |
| Light | `#faf9f5` | Light backgrounds, text on dark |
| Mid Gray | `#b0aea5` | Secondary elements |
| Light Gray | `#e8e6dc` | Subtle backgrounds |

### Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| Orange | `#d97757` | Primary accent |
| Blue | `#6a9bcc` | Secondary accent |
| Green | `#788c5d` | Tertiary accent |

## Typography

| Type | Font | Fallback |
|------|------|----------|
| Headings | Poppins | Arial |
| Body Text | Lora | Georgia |

## Application Guidelines

### Text Styling
- Headings (24pt+): Poppins font
- Body text: Lora font
- Smart color selection based on background
- Preserve text hierarchy

### Shape and Accent Colors
- Non-text shapes use accent colors
- Cycle through orange, blue, green
- Maintain visual interest while staying on-brand

## CSS Example

```css
:root {
  --color-dark: #141413;
  --color-light: #faf9f5;
  --color-mid-gray: #b0aea5;
  --color-light-gray: #e8e6dc;
  --color-accent-orange: #d97757;
  --color-accent-blue: #6a9bcc;
  --color-accent-green: #788c5d;
}

h1, h2, h3, h4 {
  font-family: 'Poppins', Arial, sans-serif;
}

body {
  font-family: 'Lora', Georgia, serif;
}
```
