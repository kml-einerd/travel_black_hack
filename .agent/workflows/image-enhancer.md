---
description: Improves image and screenshot quality by enhancing resolution, sharpness, and clarity for professional presentations and documentation
---

# Image Enhancer

Improve image quality for professional presentations and documentation.

## When to Use
- Screenshots need cleaning up
- Images are too low resolution
- Photos need sharpening
- Preparing images for presentations
- Improving documentation visuals

## Enhancement Techniques

### 1. Resize/Upscale
```python
from PIL import Image

img = Image.open('input.png')
# Upscale 2x with high quality
new_size = (img.width * 2, img.height * 2)
img_upscaled = img.resize(new_size, Image.LANCZOS)
img_upscaled.save('output.png')
```

### 2. Sharpen
```python
from PIL import ImageEnhance

enhancer = ImageEnhance.Sharpness(img)
img_sharp = enhancer.enhance(1.5)  # 1.0 = original
```

### 3. Adjust Contrast
```python
enhancer = ImageEnhance.Contrast(img)
img_contrast = enhancer.enhance(1.2)
```

### 4. Adjust Brightness
```python
enhancer = ImageEnhance.Brightness(img)
img_bright = enhancer.enhance(1.1)
```

### 5. Auto-Levels (Color Balance)
```python
from PIL import ImageOps
img_autocontrast = ImageOps.autocontrast(img)
```

## Screenshot Cleanup

```python
from PIL import Image, ImageFilter

img = Image.open('screenshot.png')

# Remove noise
img_clean = img.filter(ImageFilter.MedianFilter(3))

# Sharpen text
img_sharp = img_clean.filter(ImageFilter.SHARPEN)

# Save with high quality
img_sharp.save('clean_screenshot.png', quality=95)
```

## Batch Processing

```python
import os
from PIL import Image, ImageEnhance

input_dir = 'images/'
output_dir = 'enhanced/'

for filename in os.listdir(input_dir):
    if filename.endswith(('.png', '.jpg')):
        img = Image.open(os.path.join(input_dir, filename))
        
        # Enhance
        img = ImageEnhance.Sharpness(img).enhance(1.3)
        img = ImageEnhance.Contrast(img).enhance(1.1)
        
        # Save
        img.save(os.path.join(output_dir, filename))
```

## Best Practices

- Keep original files as backup
- Use PNG for screenshots (lossless)
- Use JPEG for photos (smaller size)
- Don't over-sharpen (creates artifacts)
- Check output on different screens
