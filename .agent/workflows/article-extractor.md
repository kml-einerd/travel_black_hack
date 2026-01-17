---
description: Extract full article text and metadata from web pages
---

# Article Extractor

Extract full article text and metadata from web pages.

## When to Use
- Saving articles for offline reading
- Research and citation
- Content analysis
- Building document collections

## Process

### 1. Fetch the Page

```python
import requests
from bs4 import BeautifulSoup

url = "https://example.com/article"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
```

### 2. Extract Metadata

```python
# Title
title = soup.find('title').text
# or
title = soup.find('meta', property='og:title')['content']

# Author
author = soup.find('meta', property='author')
# or
author = soup.find(class_='author')

# Date
date = soup.find('meta', property='article:published_time')
# or
date = soup.find('time')['datetime']

# Description
description = soup.find('meta', property='og:description')['content']
```

### 3. Extract Main Content

```python
# Common article containers
article = soup.find('article')
# or
article = soup.find(class_='post-content')
# or
article = soup.find(id='main-content')

# Get text
text = article.get_text(separator='\n', strip=True)
```

### 4. Clean Content

```python
import re

# Remove extra whitespace
text = re.sub(r'\n{3,}', '\n\n', text)

# Remove common noise
noise = ['Subscribe', 'Share this', 'Related articles']
for n in noise:
    text = text.replace(n, '')
```

### 5. Output Format

```markdown
---
title: Article Title
author: Author Name
date: 2024-01-15
source: https://example.com/article
---

# Article Title

[Extracted article content...]
```

## Using Newspaper3k (Easier)

```python
from newspaper import Article

article = Article(url)
article.download()
article.parse()

print(article.title)
print(article.authors)
print(article.publish_date)
print(article.text)
```

## Installation

```bash
pip install beautifulsoup4 requests
pip install newspaper3k  # Optional, easier extraction
```
