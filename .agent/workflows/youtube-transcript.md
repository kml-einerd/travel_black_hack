---
description: Download YouTube video transcripts and captions using yt-dlp. Use when user provides a YouTube URL or asks for subtitles/transcription.
---

# YouTube Transcript Downloader

Download transcripts (subtitles/captions) from YouTube videos using yt-dlp.

## When to Use
- User provides a YouTube URL and wants the transcript
- Asks to "download transcript from YouTube"
- Wants to "get captions" or "get subtitles"
- Needs text content from a YouTube video

## Priority Order

1. Check if yt-dlp is installed
2. List available subtitles
3. Try manual subtitles first (highest quality)
4. Fallback to auto-generated
5. Last resort: Whisper transcription

## Commands

### Check Available Subtitles
```bash
yt-dlp --list-subs "YOUTUBE_URL"
```

### Download Manual Subtitles (Preferred)
```bash
yt-dlp --write-sub --skip-download --output "OUTPUT_NAME" "YOUTUBE_URL"
```

### Download Auto-Generated (Fallback)
```bash
yt-dlp --write-auto-sub --skip-download --output "OUTPUT_NAME" "YOUTUBE_URL"
```

### Get Video Title
```bash
yt-dlp --print "%(title)s" "YOUTUBE_URL"
```

## Convert VTT to Plain Text

```bash
python3 -c "
import sys, re
seen = set()
with open('transcript.en.vtt', 'r') as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('WEBVTT') and '-->' not in line:
            clean = re.sub('<[^>]*>', '', line)
            if clean and clean not in seen:
                print(clean)
                seen.add(clean)
" > transcript.txt
```

## Installation

```bash
# macOS
brew install yt-dlp

# Linux
sudo apt install yt-dlp

# pip
pip3 install yt-dlp
```
