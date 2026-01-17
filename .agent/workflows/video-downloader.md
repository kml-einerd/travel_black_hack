---
description: Downloads videos from YouTube and other platforms for offline viewing, editing, or archival with support for various formats and quality options
---

# Video Downloader

Download videos from YouTube and other platforms using yt-dlp.

## Installation

```bash
# macOS
brew install yt-dlp

# Linux
sudo apt install yt-dlp

# pip
pip3 install yt-dlp
```

## Basic Usage

### Download Best Quality
```bash
yt-dlp "URL"
```

### List Available Formats
```bash
yt-dlp -F "URL"
```

### Download Specific Format
```bash
yt-dlp -f 22 "URL"  # Format code from -F
```

## Common Options

### Best Video + Audio
```bash
yt-dlp -f "bestvideo+bestaudio" "URL"
```

### Max 1080p
```bash
yt-dlp -f "bestvideo[height<=1080]+bestaudio" "URL"
```

### Audio Only (MP3)
```bash
yt-dlp -x --audio-format mp3 "URL"
```

### Custom Filename
```bash
yt-dlp -o "%(title)s.%(ext)s" "URL"
```

### Download Playlist
```bash
yt-dlp --yes-playlist "PLAYLIST_URL"
```

### Limit to N Videos
```bash
yt-dlp --playlist-end 5 "PLAYLIST_URL"
```

## Output Templates

```bash
# By title
-o "%(title)s.%(ext)s"

# By title with date
-o "%(upload_date)s_%(title)s.%(ext)s"

# To specific folder
-o "downloads/%(title)s.%(ext)s"
```

## Supported Sites

yt-dlp supports 1000+ sites including:
- YouTube
- Vimeo
- Twitter
- TikTok
- Instagram
- Facebook
- And many more...

Check support: `yt-dlp --list-extractors`

## Troubleshooting

### Update yt-dlp
```bash
yt-dlp -U
# or
pip install --upgrade yt-dlp
```

### Use Cookies (for age-restricted)
```bash
yt-dlp --cookies cookies.txt "URL"
```

### Slow Downloads
```bash
yt-dlp --concurrent-fragments 5 "URL"
```
