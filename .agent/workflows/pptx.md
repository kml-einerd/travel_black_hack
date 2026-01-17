---
description: Read, generate, and adjust PowerPoint slides, layouts, and templates using python-pptx
---

# PPTX - PowerPoint Processing

Create, read, and modify PowerPoint presentations.

## Library

```bash
pip install python-pptx
```

## Create Presentation

```python
from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()

# Add title slide
slide_layout = prs.slide_layouts[0]  # Title slide
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
subtitle = slide.placeholders[1]

title.text = "My Presentation"
subtitle.text = "Created with python-pptx"

# Add content slide
slide_layout = prs.slide_layouts[1]  # Title and content
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
body = slide.placeholders[1]

title.text = "Slide Title"
tf = body.text_frame
tf.text = "First bullet point"
p = tf.add_paragraph()
p.text = "Second bullet point"
p.level = 0

prs.save("presentation.pptx")
```

## Read Presentation

```python
from pptx import Presentation

prs = Presentation("presentation.pptx")

for i, slide in enumerate(prs.slides):
    print(f"\n--- Slide {i+1} ---")
    for shape in slide.shapes:
        if hasattr(shape, "text"):
            print(shape.text)
```

## Add Image

```python
from pptx.util import Inches

slide = prs.slides.add_slide(prs.slide_layouts[5])  # Blank
left = Inches(1)
top = Inches(1)
width = Inches(4)

slide.shapes.add_picture("image.png", left, top, width=width)
```

## Add Table

```python
from pptx.util import Inches

slide = prs.slides.add_slide(prs.slide_layouts[5])

rows, cols = 3, 4
left = top = Inches(1)
width = Inches(6)
height = Inches(2)

table = slide.shapes.add_table(rows, cols, left, top, width, height).table

# Set headers
table.cell(0, 0).text = "Header 1"
table.cell(0, 1).text = "Header 2"

# Set data
table.cell(1, 0).text = "Data 1"
table.cell(1, 1).text = "Data 2"
```

## Slide Layouts

| Index | Layout Type |
|-------|-------------|
| 0 | Title Slide |
| 1 | Title and Content |
| 2 | Section Header |
| 3 | Two Content |
| 4 | Comparison |
| 5 | Title Only |
| 6 | Blank |
| 7 | Content with Caption |
| 8 | Picture with Caption |

## Modify Existing

```python
prs = Presentation("existing.pptx")

# Modify first slide's title
slide = prs.slides[0]
title = slide.shapes.title
title.text = "New Title"

prs.save("modified.pptx")
```
