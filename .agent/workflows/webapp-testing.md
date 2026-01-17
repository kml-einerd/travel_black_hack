---
description: Tests local web applications using Playwright for verifying frontend functionality, debugging UI behavior, and capturing screenshots
---

# Web Application Testing with Playwright

Toolkit for testing local web applications using native Python Playwright scripts.

## When to Use
- Verifying frontend functionality
- Debugging UI behavior
- Capturing browser screenshots
- E2E testing of web apps

## Decision Tree

```
User task → Is it static HTML?
    ├─ Yes → Read HTML file directly to identify selectors
    │         Then write Playwright script using selectors
    │
    └─ No (dynamic webapp) → Is the server already running?
        ├─ No → Start server + write Playwright script
        │
        └─ Yes → Reconnaissance-then-action:
            1. Navigate and wait for networkidle
            2. Take screenshot or inspect DOM
            3. Identify selectors from rendered state
            4. Execute actions with discovered selectors
```

## Basic Playwright Script

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:5173')
    page.wait_for_load_state('networkidle')  # CRITICAL: Wait for JS
    
    # Take screenshot
    page.screenshot(path='/tmp/screenshot.png', full_page=True)
    
    # Inspect DOM
    content = page.content()
    buttons = page.locator('button').all()
    
    browser.close()
```

## Common Patterns

### Screenshot Capture
```python
page.screenshot(path='/tmp/inspect.png', full_page=True)
```

### Wait for Elements
```python
page.wait_for_selector('#my-element')
page.wait_for_timeout(1000)  # 1 second
```

### Click and Type
```python
page.click('button#submit')
page.fill('input[name="email"]', 'test@example.com')
```

## Common Pitfall

❌ **Don't** inspect the DOM before waiting for `networkidle` on dynamic apps
✅ **Do** wait for `page.wait_for_load_state('networkidle')` before inspection

## Best Practices

- Use `sync_playwright()` for synchronous scripts
- Always close the browser when done
- Use descriptive selectors: `text=`, `role=`, CSS selectors, or IDs
- Add appropriate waits for dynamic content
