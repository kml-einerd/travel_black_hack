---
description: Comprehensive feature development workflow with 7-phase approach - discovery, exploration, questions, architecture, implementation, review, summary
---

# Feature Development Workflow

A comprehensive, structured workflow for feature development with specialized agents for codebase exploration, architecture design, and quality review.

## Philosophy

Building features requires more than just writing code:
- **Understand the codebase** before making changes
- **Ask questions** to clarify ambiguous requirements
- **Design thoughtfully** before implementing
- **Review for quality** after building

## Usage

```bash
/feature-dev Add user authentication with OAuth
```

Or simply:
```bash
/feature-dev
```

## The 7-Phase Workflow

### Phase 1: Discovery
**Goal**: Understand what needs to be built

- Clarifies the feature request
- Asks what problem you're solving
- Identifies constraints and requirements
- Confirms understanding with you

### Phase 2: Codebase Exploration
**Goal**: Understand relevant existing code and patterns

- Launches 2-3 `code-explorer` agents in parallel
- Each agent explores different aspects (similar features, architecture, UI patterns)
- Returns comprehensive analysis with key files to read
- Presents findings summary

### Phase 3: Clarifying Questions
**Goal**: Fill in gaps and resolve all ambiguities

- Reviews codebase findings and feature request
- Identifies underspecified aspects:
  - Edge cases
  - Error handling
  - Integration points
  - Backward compatibility
  - Performance needs
- **Waits for your answers before proceeding**

### Phase 4: Architecture Design
**Goal**: Design multiple implementation approaches

Launches 2-3 `code-architect` agents with different focuses:
- **Minimal changes**: Smallest change, maximum reuse
- **Clean architecture**: Maintainability, elegant abstractions
- **Pragmatic balance**: Speed + quality

Presents comparison with trade-offs and recommendation.

### Phase 5: Implementation
**Goal**: Build the feature

- **Waits for explicit approval** before starting
- Reads all relevant files identified in previous phases
- Implements following chosen architecture
- Follows codebase conventions strictly

### Phase 6: Quality Review
**Goal**: Ensure code is simple, DRY, elegant, and functionally correct

Launches 3 `code-reviewer` agents in parallel:
- **Simplicity/DRY/Elegance**: Code quality and maintainability
- **Bugs/Correctness**: Functional correctness and logic errors
- **Conventions/Abstractions**: Project standards and patterns

Presents findings and asks:
- Fix now
- Fix later
- Proceed as-is

### Phase 7: Summary
**Goal**: Document what was accomplished

- What was built
- Key decisions made
- Files modified
- Suggested next steps

## When to Use

**Use for:**
- New features that touch multiple files
- Features requiring architectural decisions
- Complex integrations with existing code
- Features where requirements are somewhat unclear

**Don't use for:**
- Single-line bug fixes
- Trivial changes
- Well-defined, simple tasks
- Urgent hotfixes

## Best Practices

1. **Use the full workflow for complex features**: The 7 phases ensure thorough planning
2. **Answer clarifying questions thoughtfully**: Phase 3 prevents future confusion
3. **Choose architecture deliberately**: Phase 4 gives you options for a reason
4. **Don't skip code review**: Phase 6 catches issues before production

## Example

```bash
/feature-dev Add rate limiting to API endpoints

# Claude will:
# Phase 1: Ask clarifying questions about rate limits
# Phase 2: Explore existing API middleware and patterns
# Phase 3: Ask about limits per endpoint, storage, etc.
# Phase 4: Present 3 architecture options
# Phase 5: Implement after your approval
# Phase 6: Run quality review
# Phase 7: Summarize what was built
```
