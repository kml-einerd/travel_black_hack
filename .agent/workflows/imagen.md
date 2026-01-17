---
description: Generate images using Google Gemini's image generation API for UI mockups, icons, illustrations, and visual assets
---

# Imagen - Image Generation

Generate images using Gemini or other image generation APIs.

## When to Use
- UI mockups
- Icons and illustrations
- Visual assets
- Placeholder images
- Concept visualization

## Using generate_image Tool

I have a built-in `generate_image` tool that can create images:

```
generate_image(
  prompt="A modern dashboard UI with dark theme and gradient accents",
  image_name="dashboard_mockup"
)
```

## Prompt Tips

### Be Specific
```
❌ "A button"
✅ "A rounded blue button with white text 'Submit', subtle shadow, 44px height"
```

### Include Style
```
✅ "Minimalist icon in flat design style, single color, 64x64px"
```

### Describe Context
```
✅ "Hero section for a fintech app, dark gradient background, 
    floating card elements, professional and modern"
```

## Common Use Cases

### UI Elements
```
"A set of 6 navigation icons in outline style: home, search, 
profile, settings, notifications, menu. White on transparent."
```

### Mockups
```
"Mobile app login screen, minimal design, email and password 
fields, 'Sign In' button, social login options at bottom"
```

### Illustrations
```
"Isometric illustration of a person working on laptop, 
soft colors, modern flat style, suitable for landing page"
```

### Backgrounds
```
"Abstract gradient background, purple to blue, subtle 
geometric patterns, suitable for tech website header"
```

## Best Practices

1. **Describe clearly** - Be specific about what you want
2. **Include dimensions** - When size matters
3. **Specify style** - Flat, 3D, realistic, etc.
4. **Color palette** - Mention specific colors if needed
5. **Context** - What will it be used for?
