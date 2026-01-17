---
description: Creates isolated git worktrees with smart directory selection and safety verification
---

# Using Git Worktrees

Create isolated git worktrees for parallel work.

## What Are Worktrees?

Git worktrees let you have multiple branches checked out simultaneously in different directories.

## When to Use
- Working on multiple features
- Reviewing PRs while working
- Testing different branches
- Parallel development

## Commands

### Create Worktree

```bash
# New worktree for existing branch
git worktree add ../feature-branch feature-branch

# New worktree with new branch
git worktree add -b new-feature ../new-feature main
```

### List Worktrees

```bash
git worktree list
```

### Remove Worktree

```bash
# Remove worktree directory
git worktree remove ../feature-branch

# Force remove if changes
git worktree remove --force ../feature-branch
```

### Prune (cleanup stale references)

```bash
git worktree prune
```

## Directory Structure

```
project/
├── main/              # Main worktree
│   └── ...
├── feature-auth/      # Feature worktree
│   └── ...
└── bugfix-login/      # Bugfix worktree
    └── ...
```

## Best Practices

1. **Naming Convention**
   ```bash
   git worktree add ../<branch-name> <branch-name>
   ```

2. **Keep Parent Clean**
   Create worktrees as siblings, not in project

3. **Clean Up After Merge**
   ```bash
   git worktree remove ../feature-branch
   git branch -d feature-branch
   ```

4. **Check Status Regularly**
   ```bash
   git worktree list
   ```

## Common Workflow

```bash
# Start feature
git worktree add -b feature-x ../feature-x main

# Work in new directory
cd ../feature-x
# ... make changes ...
git commit -m "Feature X"

# Push and PR
git push -u origin feature-x

# After merge, cleanup
cd ../main
git worktree remove ../feature-x
git branch -d feature-x
```

## Advantages
- No stashing needed
- Parallel work possible
- Clean separation
- Full repo access in each
