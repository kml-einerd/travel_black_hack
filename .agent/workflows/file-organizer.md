---
description: Intelligently organizes files and folders by understanding context, finding duplicates, and suggesting better organizational structures
---

# File Organizer

Intelligently organize files and folders.

## When to Use
- Downloads folder is chaotic
- Can't find files
- Have duplicate files
- Folder structure doesn't make sense
- Starting a new project

## Process

### 1. Analyze Current State

```bash
# Overview
ls -la [directory]

# File types
find [directory] -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn

# Largest files
du -sh [directory]/* | sort -rh | head -20
```

### 2. Identify Patterns

**By Type:**
- Documents (PDF, DOCX, TXT)
- Images (JPG, PNG, SVG)
- Videos (MP4, MOV)
- Archives (ZIP, TAR)
- Code/Projects

**By Purpose:**
- Work vs Personal
- Active vs Archive
- Project-specific

### 3. Find Duplicates

```bash
# Find exact duplicates by hash
find [directory] -type f -exec md5 {} \; | sort | uniq -d

# Find same-name files
find [directory] -type f -printf '%f\n' | sort | uniq -d
```

### 4. Propose Structure

```
Directory/
├── Work/
│   ├── Projects/
│   ├── Documents/
│   └── Archive/
├── Personal/
│   ├── Photos/
│   └── Documents/
└── Downloads/
    ├── To-Sort/
    └── Archive/
```

### 5. Execute (with approval)

```bash
# Create folders
mkdir -p Work/Projects Work/Documents Work/Archive

# Move files
mv *.pdf Work/Documents/
mv *.jpg Personal/Photos/
```

## Safety Rules

1. **Always ask** before deleting
2. **Show plan** before executing
3. **Don't touch** current projects
4. **Backup** before major changes
5. **Log** all actions

## Quick Commands

```bash
# Sort downloads by type
for ext in pdf jpg png mp4 zip; do
  mkdir -p sorted/$ext
  mv *.$ext sorted/$ext/ 2>/dev/null
done

# Find old files (>6 months)
find . -mtime +180 -type f

# Remove empty directories
find . -type d -empty -delete
```
