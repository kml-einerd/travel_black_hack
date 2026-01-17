---
description: Code review a pull request - automated review using multiple specialized agents with confidence-based scoring to filter false positives
---

Provide a code review for the given pull request.

## Overview

This command performs automated code review on a pull request using multiple specialized agents:
- **2x CLAUDE.md compliance agents**: Check guideline adherence
- **1x Bug detector**: Scan for obvious bugs in changes only
- **1x History analyzer**: Context from git blame

## Usage

```bash
/code-review [--comment]
```

**Options:**
- `--comment`: Post the review as a comment on the pull request (default: outputs to terminal only)

## How It Works

1. **Pre-check**: Verify PR needs review (skips closed, draft, trivial, or already-reviewed PRs)
2. **Gather guidelines**: Collect relevant CLAUDE.md files from the repository
3. **Summarize changes**: Create PR summary
4. **Parallel review**: Launch 4 agents to independently review
5. **Score issues**: Each issue scored 0-100 for confidence
6. **Filter**: Remove issues below 80 confidence threshold
7. **Output**: Post review to terminal or PR comment

## Confidence Scoring

- **0**: Not confident, false positive
- **25**: Somewhat confident, might be real
- **50**: Moderately confident, real but minor
- **75**: Highly confident, real and important
- **100**: Absolutely certain, definitely real

## What Gets Flagged (HIGH SIGNAL Only)

✅ **Do flag:**
- Code that will fail to compile or parse (syntax errors, type errors, missing imports)
- Code that will definitely produce wrong results (clear logic errors)
- Clear, unambiguous CLAUDE.md violations (with exact quoted rule)

❌ **Do NOT flag:**
- Pre-existing issues not introduced in PR
- Code style or quality concerns
- Potential issues that depend on specific inputs
- Subjective suggestions
- Issues linters will catch
- General quality issues (unless in CLAUDE.md)

## Requirements

- Git repository with GitHub integration
- GitHub CLI (`gh`) installed and authenticated
- CLAUDE.md files (optional but recommended)

## Example Output

```markdown
## Code review

Found 3 issues:

1. Missing error handling for OAuth callback (CLAUDE.md says "Always handle OAuth errors")
   https://github.com/owner/repo/blob/abc123.../src/auth.ts#L67-L72

2. Memory leak: OAuth state not cleaned up
   https://github.com/owner/repo/blob/abc123.../src/auth.ts#L88-L95

3. Inconsistent naming pattern (CLAUDE.md says "Use camelCase for functions")
   https://github.com/owner/repo/blob/abc123.../src/utils.ts#L23-L28
```

## Tips

- Write specific CLAUDE.md files for better compliance checking
- Trust the 80+ confidence threshold - false positives are filtered
- Run on all non-trivial pull requests
- Review agent findings as a starting point for human review
