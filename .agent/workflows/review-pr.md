---
description: Comprehensive PR review using specialized agents - comments, tests, errors, types, code quality, simplification
---

# Comprehensive PR Review

Run a comprehensive pull request review using multiple specialized agents, each focusing on a different aspect of code quality.

## Usage

```bash
/review-pr [review-aspects]
```

## Available Review Aspects

- **comments** - Analyze code comment accuracy and maintainability
- **tests** - Review test coverage quality and completeness
- **errors** - Check error handling for silent failures
- **types** - Analyze type design and invariants (if new types added)
- **code** - General code review for project guidelines
- **simplify** - Simplify code for clarity and maintainability
- **all** - Run all applicable reviews (default)

## Review Workflow

1. **Determine Review Scope**
   - Check git status to identify changed files
   - Parse arguments for specific review aspects
   - Default: Run all applicable reviews

2. **Identify Changed Files**
   - Run `git diff --name-only` to see modified files
   - Check if PR already exists: `gh pr view`
   - Identify file types and what reviews apply

3. **Determine Applicable Reviews**
   - **Always applicable**: code-reviewer (general quality)
   - **If test files changed**: pr-test-analyzer
   - **If comments/docs added**: comment-analyzer
   - **If error handling changed**: silent-failure-hunter
   - **If types added/modified**: type-design-analyzer
   - **After passing review**: code-simplifier (polish)

4. **Launch Review Agents**
   - Sequential (one at a time) or Parallel (faster)

5. **Aggregate Results**
   - **Critical Issues** (must fix before merge)
   - **Important Issues** (should fix)
   - **Suggestions** (nice to have)
   - **Positive Observations** (what's good)

## Specialized Agents

### comment-analyzer
- Verifies comment accuracy vs code
- Identifies comment rot
- Checks documentation completeness

### pr-test-analyzer
- Reviews behavioral test coverage
- Identifies critical gaps (rates 1-10)
- Evaluates test quality

### silent-failure-hunter
- Finds silent failures in catch blocks
- Reviews error handling adequacy
- Checks error logging

### type-design-analyzer
- Analyzes type encapsulation (1-10)
- Reviews invariant expression (1-10)
- Rates type usefulness and enforcement

### code-reviewer
- Checks CLAUDE.md compliance
- Detects bugs and issues (scores 0-100)
- Reviews general code quality

### code-simplifier
- Simplifies complex code
- Improves clarity and readability
- Preserves functionality

## Usage Examples

**Full review (default):**
```bash
/review-pr
```

**Specific aspects:**
```bash
/review-pr tests errors     # Only test coverage and error handling
/review-pr comments         # Only code comments
/review-pr simplify         # Simplify code after passing review
```

**Parallel review:**
```bash
/review-pr all parallel     # Launch all agents in parallel
```

## Output Format

```markdown
# PR Review Summary

## Critical Issues (X found)
- [agent-name]: Issue description [file:line]

## Important Issues (X found)
- [agent-name]: Issue description [file:line]

## Suggestions (X found)
- [agent-name]: Suggestion [file:line]

## Strengths
- What's well-done in this PR

## Recommended Action
1. Fix critical issues first
2. Address important issues
3. Consider suggestions
4. Re-run review after fixes
```

## Workflow Integration

**Before committing:**
```
1. Write code
2. Run: /review-pr code errors
3. Fix any critical issues
4. Commit
```

**Before creating PR:**
```
1. Stage all changes
2. Run: /review-pr all
3. Address all critical and important issues
4. Run specific reviews again to verify
5. Create PR
```

## Tips

- **Run early**: Before creating PR, not after
- **Focus on changes**: Agents analyze git diff by default
- **Address critical first**: Fix high-priority issues before lower priority
- **Re-run after fixes**: Verify issues are resolved
