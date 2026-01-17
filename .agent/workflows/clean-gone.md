---
description: Clean up all git branches marked as [gone] - branches deleted on remote but still exist locally
---

# Clean Gone Branches

Cleans up all git branches marked as [gone] (branches that have been deleted on the remote but still exist locally), including removing associated worktrees.

## What it does

1. Lists all local branches to identify [gone] status
2. Identifies and removes worktrees associated with [gone] branches
3. Deletes all branches marked as [gone]
4. Provides feedback on removed branches

## Usage

```bash
/clean-gone
```

## Commands Executed

1. **List branches to identify [gone] status:**
   ```bash
   git branch -v
   ```

2. **Identify worktrees that need to be removed:**
   ```bash
   git worktree list
   ```

3. **Remove worktrees and delete [gone] branches:**
   ```bash
   git branch -v | grep '\[gone\]' | sed 's/^[+* ]//' | awk '{print $1}' | while read branch; do
     echo "Processing branch: $branch"
     worktree=$(git worktree list | grep "\\[$branch\\]" | awk '{print $1}')
     if [ ! -z "$worktree" ] && [ "$worktree" != "$(git rev-parse --show-toplevel)" ]; then
       echo "  Removing worktree: $worktree"
       git worktree remove --force "$worktree"
     fi
     echo "  Deleting branch: $branch"
     git branch -D "$branch"
   done
   ```

## Features

- Handles both regular branches and worktree branches
- Safely removes worktrees before deleting branches
- Shows clear feedback about what was removed
- Reports if no cleanup was needed

## When to Use

- After merging and deleting remote branches
- When your local branch list is cluttered with stale branches
- During regular repository maintenance

## Example Workflow

```bash
# After PRs are merged and remote branches are deleted
/clean-gone

# Claude will:
# - Find all branches marked as [gone]
# - Remove any associated worktrees
# - Delete the stale local branches
# - Report what was cleaned up
```

## Tips

- Run `git fetch --prune` first to update remote tracking
- Safe to run - only removes branches already deleted remotely
- Run periodically to keep your branch list clean
