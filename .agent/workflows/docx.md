---
description: Create, edit, and analyze Word documents with tracked changes, comments, and formatting using python-docx and pandoc
---

# DOCX - Word Document Processing

Create, edit, and analyze Word documents with tracked changes and formatting.

## Tools

| Tool | Use For |
|------|---------|
| python-docx | Creating/editing .docx files |
| pandoc | Converting to/from markdown |
| LibreOffice | PDF conversion |

## Reading Documents

### Extract Text with Pandoc
```bash
pandoc document.docx -o document.md
```

### With Tracked Changes
```bash
pandoc --track-changes=all document.docx -o document.md
```

## Creating Documents

```python
from docx import Document

doc = Document()
doc.add_heading('Title', 0)
doc.add_paragraph('This is a paragraph.')
doc.add_heading('Section 1', level=1)
doc.add_paragraph('Section content here.')

# Add a table
table = doc.add_table(rows=2, cols=3)
table.cell(0, 0).text = 'Header 1'
table.cell(0, 1).text = 'Header 2'

doc.save('output.docx')
```

## Editing Documents

```python
from docx import Document

doc = Document('input.docx')

# Find and replace text
for para in doc.paragraphs:
    if 'old text' in para.text:
        para.text = para.text.replace('old text', 'new text')

doc.save('modified.docx')
```

## Tracked Changes Workflow

1. **Get markdown with changes:**
   ```bash
   pandoc --track-changes=all file.docx -o current.md
   ```

2. **Unpack document (for XML editing):**
   ```bash
   python ooxml/scripts/unpack.py file.docx unpacked/
   ```

3. **Make changes to XML**

4. **Pack back:**
   ```bash
   python ooxml/scripts/pack.py unpacked/ output.docx
   ```

## Convert to PDF
```bash
soffice --headless --convert-to pdf document.docx
```

## Convert to Images
```bash
pdftoppm -jpeg -r 150 document.pdf page
# Creates page-1.jpg, page-2.jpg, etc.
```

## Dependencies

```bash
pip install python-docx
sudo apt-get install pandoc libreoffice poppler-utils
```
