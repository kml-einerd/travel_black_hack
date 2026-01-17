---
description: Dispatches independent subagents for individual tasks with code review checkpoints between iterations for rapid, controlled development
---

# Subagent-Driven Development

Dispatch independent subagents for parallel task execution with review checkpoints.

## Concept

Break work into independent tasks, dispatch subagents for each, then consolidate with reviews.

## When to Use
- Large features with independent parts
- Parallel work possible
- Complex tasks needing specialization
- Review-intensive workflows

## Workflow

### 1. Decompose Task

Break into independent units:
```
Main Task: Build User Dashboard
├── Subagent 1: Data API
├── Subagent 2: UI Components
├── Subagent 3: Charts/Visualization
└── Subagent 4: Tests
```

### 2. Define Subagent Specs

For each subagent:
```markdown
## Subagent: [Name]

**Task:** [Specific deliverable]

**Inputs:**
- [What it needs]

**Outputs:**
- [What it produces]

**Constraints:**
- [Rules to follow]

**Definition of Done:**
- [ ] Criteria 1
- [ ] Criteria 2
```

### 3. Execute in Parallel

Launch subagents with clear boundaries:
- Independent tasks
- No shared state during execution
- Clear interfaces

### 4. Review Checkpoint

After each iteration:
```markdown
## Review: [Subagent Name]

### Deliverables
- [x] Code implemented
- [x] Tests passing

### Quality Check
- [ ] Follows patterns
- [ ] No obvious bugs
- [ ] Documentation

### Integration Points
- [ ] API compatible
- [ ] Contracts met
```

### 5. Consolidate

Merge subagent outputs:
- Resolve conflicts
- Verify integration
- Run full test suite

## Best Practices

1. **Clear Boundaries** - Each subagent has clear scope
2. **Interface Contracts** - Define inputs/outputs upfront
3. **Review Checkpoints** - Don't proceed without review
4. **Independent Tasks** - Minimize dependencies
5. **Fail Fast** - Quick feedback loops

## Example

```
/subagent-driven-development

Task: Implement Authentication

Subagents:
1. Backend API (auth routes, JWT)
2. Frontend UI (login form, state)
3. Database (user schema, queries)
4. Tests (unit + integration)

Checkpoint after each: code review
```
