---
description: Commit, push, and open a PR in one step
---

# Commit, Push, and Create PR

Complete workflow command that commits, pushes, and creates a pull request in one step.

## What it does

1. Creates a new branch (if currently on main)
2. Stages and commits changes with an appropriate message
3. Pushes the branch to origin
4. Creates a pull request using `gh pr create`
5. Provides the PR URL

## Usage

```bash
/commit-push-pr
```

## Context Gathered

- Current git status: `git status`
- Current git diff: `git diff HEAD`
- Current branch: `git branch --show-current`

## Features

- Analyzes all commits in the branch (not just the latest)
- Creates comprehensive PR descriptions with:
  - Summary of changes (1-3 bullet points)
  - Test plan checklist
  - Claude Code attribution
- Handles branch creation automatically
- Uses GitHub CLI (`gh`) for PR creation

## Requirements

- GitHub CLI (`gh`) must be installed and authenticated
- Repository must have a remote named `origin`

## Example Workflow

```bash
# Make your changes
# Then run:
/commit-push-pr

# Claude will:
# - Create a feature branch (if needed)
# - Commit your changes
# - Push to remote
# - Open a PR with summary and test plan
# - Give you the PR URL to review
```

## Tips

- Use when you're ready to create a PR
- Ensure all your changes are complete and tested
- Claude will analyze the full branch history for the PR description
- Review the PR description and edit if needed
- Use when you want to minimize context switching
