import os
import re

# Emoji to SVG Path mapping (Lucide icons)
ICON_MAP = {
    '🔥': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.072-4-2.072-5.5C7.928 1 10.928 2 13 6c1.071 2.071 2.071 3.929 2.071 5.5a2.5 2.5 0 0 1-2.5 2.5c-.69 0-1.25-.56-1.25-1.25 0-1.38-.5-2-1-3-1.072-2.143-2.072-4-2.072-5.5C8.257 1.75 5.257 1.75 3 6c-1.071 2.071-2.071 3.929-2.071 5.5a2.5 2.5 0 0 0 2.5 2.5c.69 0 1.25-.56 1.25-1.25z"/>', # Simplified Flame
    '⚡': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', # Zap
    '🤖': '<rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/>', # Bot
    '🗺️': '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', # Globe/Map
    '💪': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>', # Activity/Trending (Alternative for Bootcamp)
    '🎓': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', # Graduation Cap
    '📰': '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8"/><path d="M10 10h8"/>', # Newspaper
    '📈': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>', # Trending Up
    '🔴': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>', # Alert Circle
    '🏆': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>', # Trophy
}

# Regex to find headers with emojis
# Matches <h1 class="...">Emoji Title</h1> or <h1>Emoji Title</h1>
# Captures: 1=Tag, 2=Attrs, 3=Emoji, 4=Rest of Title
REGEX = re.compile(r'<(h[1-6])([^>]*)>\s*([🔥⚡🤖🗺️💪🎓📰📈🔴🏆])\s*(.*?)</\1>')

def replacement_func(match):
    tag = match.group(1)
    attrs = match.group(2)
    emoji = match.group(3)
    text = match.group(4)

    svg_path = ICON_MAP.get(emoji, '')
    if not svg_path:
        return match.group(0)

    # Construct new HTML
    # Add 'section-title' to class if existing, or create new class attr
    new_attrs = attrs
    if 'class="' in new_attrs:
        new_attrs = new_attrs.replace('class="', 'class="section-title ')
    else:
        new_attrs = new_attrs + ' class="section-title"'

    icon_html = f'<span class="section-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{svg_path}</svg></span>'

    return f'<{tag}{new_attrs}>{icon_html}{text}</{tag}>'

target_dir = 'Projeto/demos'

for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.html'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()

            new_content = REGEX.sub(replacement_func, content)

            if new_content != content:
                print(f"Refactoring headers in {path}")
                with open(path, 'w') as f:
                    f.write(new_content)
