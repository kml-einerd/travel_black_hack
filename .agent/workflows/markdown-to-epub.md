---
description: Converts markdown documents and chat summaries into professional EPUB ebook files
---

# Markdown to EPUB Converter

Convert markdown documents to professional EPUB ebook files.

## Tool

```bash
# Install Pandoc
brew install pandoc  # macOS
sudo apt install pandoc  # Linux
```

## Basic Conversion

```bash
pandoc input.md -o output.epub
```

## With Metadata

Create `metadata.yaml`:
```yaml
---
title: My Book Title
author: Author Name
date: 2024-01-15
lang: en
description: A description of the book
cover-image: cover.jpg
---
```

Then convert:
```bash
pandoc input.md --metadata-file=metadata.yaml -o output.epub
```

## With Table of Contents

```bash
pandoc input.md --toc --toc-depth=2 -o output.epub
```

## Multiple Files

```bash
pandoc chapter1.md chapter2.md chapter3.md \
  --metadata title="My Book" \
  --toc \
  -o output.epub
```

## With Custom CSS

Create `epub.css`:
```css
body {
  font-family: Georgia, serif;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: Helvetica, sans-serif;
}

code {
  background: #f4f4f4;
  padding: 2px 4px;
}
```

```bash
pandoc input.md --css=epub.css -o output.epub
```

## Complete Example

```bash
pandoc chapter*.md \
  --metadata title="Complete Guide" \
  --metadata author="John Doe" \
  --toc \
  --toc-depth=3 \
  --css=styles.css \
  --epub-cover-image=cover.jpg \
  -o book.epub
```

## From HTML

```bash
pandoc input.html -o output.epub
```

## Validation

```bash
# Install epubcheck
java -jar epubcheck.jar output.epub
```

## Tips

1. **Use proper headings** - `#` for chapters, `##` for sections
2. **Add cover image** - 1600x2400px recommended
3. **Include TOC** - Makes navigation easier
4. **Test on readers** - Check on Kindle, iBooks, etc.
5. **Validate** - Use epubcheck for standards compliance
