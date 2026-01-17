---
description: Create a git commit with automatically generated message based on changes
---

# Git Commit

Create a git commit with an automatically generated commit message based on staged and unstaged changes.

## What it does

1. Analyzes current git status
2. Reviews both staged and unstaged changes
3. Examines recent commit messages to match your repository's style
4. Drafts an appropriate commit message
5. Stages relevant files
6. Creates the commit

## Usage

```bash
/commit
```

## Context Gathered

- Current git status: `git status`
- Current git diff (staged and unstaged): `git diff HEAD`
- Current branch: `git branch --show-current`
- Recent commits: `git log --oneline -10`

## Features

- Automatically drafts commit messages that match your repo's style
- Follows conventional commit practices
- Avoids committing files with secrets (.env, credentials.json)
- Includes Claude Code attribution in commit message

## Example Workflow

```bash
# Make some changes to your code
# Then simply run:
/commit

# Claude will:
# - Review your changes
# - Stage the files
# - Create a commit with an appropriate message
# - Show you the commit status
```

## Tips

- Review the staged changes before committing
- Let Claude analyze your changes and match your repo's commit style
- Trust the automated message, but verify it's accurate
- Use for routine commits during development
