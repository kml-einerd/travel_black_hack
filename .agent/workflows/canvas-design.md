---
description: Creates beautiful visual art in PNG and PDF documents using design philosophy and aesthetic principles for posters, designs, and static pieces
---

# Canvas Design

Create visual art in PNG and PDF for posters, designs, and static pieces.

## When to Use
- Creating posters
- Designing static graphics
- Making visual presentations
- Creating branded materials
- Producing shareable images

## Design Principles

### Composition
- **Rule of thirds** - Place key elements on grid intersections
- **Visual hierarchy** - Guide the eye with size, color, contrast
- **Balance** - Symmetric or asymmetric, but intentional
- **White space** - Give elements room to breathe

### Color
- **Limited palette** - 3-5 colors maximum
- **Contrast** - Ensure readability
- **Mood** - Colors evoke emotions
- **Consistency** - Use brand guidelines if applicable

### Typography
- **Limit fonts** - 2-3 maximum
- **Hierarchy** - Headlines, subheads, body
- **Readability** - Appropriate size and spacing
- **Personality** - Match font to message

## Tools

### Python Libraries
```python
from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
```

### Creating PNG with PIL
```python
img = Image.new('RGB', (1920, 1080), color='#faf9f5')
draw = ImageDraw.Draw(img)
font = ImageFont.truetype('Poppins-Bold.ttf', 72)
draw.text((100, 100), "Title", font=font, fill='#141413')
img.save('output.png')
```

### Creating PDF with ReportLab
```python
c = canvas.Canvas("output.pdf", pagesize=letter)
c.setFont("Helvetica-Bold", 36)
c.drawString(100, 700, "Title")
c.save()
```

## Output Formats

| Format | Best For |
|--------|----------|
| PNG | Web, social media, presentations |
| PDF | Print, documents, portfolios |
| SVG | Scalable graphics, icons |

## Checklist

- [ ] Clear focal point
- [ ] Readable text
- [ ] Consistent style
- [ ] Appropriate resolution
- [ ] Brand alignment
