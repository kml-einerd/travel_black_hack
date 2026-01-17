---
description: Start Ralph Wiggum loop - iterative, self-referential AI development loops for persistent task completion
---

# Ralph Wiggum Loop

Implementation of the Ralph Wiggum technique for iterative, self-referential AI development loops.

## What is Ralph?

Ralph is a development methodology based on continuous AI agent loops. As Geoffrey Huntley describes it: **"Ralph is a Bash loop"** - a simple `while true` that repeatedly feeds an AI agent a prompt file, allowing it to iteratively improve its work until completion.

## Usage

```bash
/ralph-loop "Your task description" --completion-promise "DONE" --max-iterations 50
```

**Options:**
- `--max-iterations <n>` - Stop after N iterations (default: unlimited)
- `--completion-promise <text>` - Phrase that signals completion

## How It Works

The loop happens **inside your current session**:
1. Works on the task
2. Tries to exit
3. Stop hook blocks exit
4. Stop hook feeds the SAME prompt back
5. Repeat until completion

This creates a **self-referential feedback loop** where:
- The prompt never changes between iterations
- Claude's previous work persists in files
- Each iteration sees modified files and git history
- Claude autonomously improves by reading its own past work

## Example

```bash
/ralph-loop "Build a REST API for todos. Requirements: CRUD operations, input validation, tests. Output <promise>COMPLETE</promise> when done." --completion-promise "COMPLETE" --max-iterations 50
```

Claude will:
- Implement the API iteratively
- Run tests and see failures
- Fix bugs based on test output
- Iterate until all requirements met
- Output the completion promise when done

## Prompt Writing Best Practices

### 1. Clear Completion Criteria
```markdown
Build a REST API for todos.

When complete:
- All CRUD endpoints working
- Input validation in place
- Tests passing (coverage > 80%)
- README with API docs
- Output: <promise>COMPLETE</promise>
```

### 2. Incremental Goals
```markdown
Phase 1: User authentication (JWT, tests)
Phase 2: Product catalog (list/search, tests)
Phase 3: Shopping cart (add/remove, tests)

Output <promise>COMPLETE</promise> when all phases done.
```

### 3. Self-Correction (TDD)
```markdown
Implement feature X following TDD:
1. Write failing tests
2. Implement feature
3. Run tests
4. If any fail, debug and fix
5. Refactor if needed
6. Repeat until all green
7. Output: <promise>COMPLETE</promise>
```

## When to Use Ralph

**Good for:**
- Well-defined tasks with clear success criteria
- Tasks requiring iteration and refinement
- Greenfield projects where you can walk away
- Tasks with automatic verification (tests, linters)

**Not good for:**
- Tasks requiring human judgment
- One-shot operations
- Tasks with unclear success criteria
- Production debugging

## Cancel Loop

```bash
/cancel-ralph
```

## Philosophy

1. **Iteration > Perfection** - Don't aim for perfect on first try
2. **Failures Are Data** - Use them to tune prompts
3. **Persistence Wins** - Keep trying until success

## Real-World Results

- Successfully generated 6 repositories overnight (Y Combinator hackathon)
- One $50k contract completed for $297 in API costs
- Created entire programming language over 3 months

## Learn More

- Original technique: https://ghuntley.com/ralph/
- Ralph Orchestrator: https://github.com/mikeyobrien/ralph-orchestrator
