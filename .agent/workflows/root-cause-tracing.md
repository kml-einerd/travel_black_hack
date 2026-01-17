---
description: Use when errors occur deep in execution and you need to trace back to find the original trigger
---

# Root Cause Tracing

Find the original trigger when errors occur deep in execution.

## When to Use
- Error appears far from its cause
- Stack traces are unhelpful
- Debugging complex systems
- Unexplained failures

## Process

### 1. Capture the Error

Document:
- Error message
- Stack trace
- When it happened
- What triggered it

### 2. Trace Backwards

```
Error in C
  ↑ Called by B
    ↑ Called by A
      ↑ Triggered by user action
```

### 3. Check Each Layer

For each step back:
- What inputs did it receive?
- What state was it in?
- What assumptions does it make?
- What could go wrong?

### 4. Add Logging

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def function_a(input):
    logger.debug(f"function_a called with: {input}")
    # ... logic
    logger.debug(f"function_a returning: {result}")
    return result
```

### 5. Binary Search

When trace is too long:
1. Add log at middle point
2. Check if error data is correct there
3. If correct, problem is after → search forward
4. If wrong, problem is before → search backward
5. Repeat until found

## Common Root Causes

| Symptom | Likely Cause |
|---------|--------------|
| Null/undefined error | Data not initialized |
| Type error | Wrong data type passed |
| Out of bounds | Index calculation wrong |
| Timeout | Infinite loop or slow dependency |
| Wrong result | Logic error in calculation |

## Debugging Checklist

- [ ] Check recent changes
- [ ] Verify inputs are valid
- [ ] Check for off-by-one errors
- [ ] Verify state at each step
- [ ] Check for race conditions
- [ ] Review error handling paths
- [ ] Check external dependencies

## Tools

```bash
# Git bisect to find breaking commit
git bisect start
git bisect bad HEAD
git bisect good v1.0
# Test each commit until found
```
