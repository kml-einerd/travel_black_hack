---
description: Enable explanatory output style - educational insights about implementation choices and codebase patterns
---

# Explanatory Output Style

This workflow enables Claude to provide educational insights about implementation choices while completing tasks.

## What it does

When enabled, Claude will:
1. Provide educational insights about implementation choices
2. Explain codebase patterns and decisions
3. Balance task completion with learning opportunities

## Output Format

Insights are formatted as:

```
★ Insight ─────────────────────────────────────
[2-3 key educational points]
─────────────────────────────────────────────────
```

## Focus Areas

The insights focus on:
- Specific implementation choices for your codebase
- Patterns and conventions in your code
- Trade-offs and design decisions
- Codebase-specific details rather than general programming concepts

## When to Use

Enable this when you want to:
- Learn from the code changes being made
- Understand why certain approaches are chosen
- Get context about codebase patterns
- Have educational commentary alongside implementation

## Usage

Simply reference this workflow by asking:
```
/explanatory-output - Enable educational insights while coding
```

Or ask Claude to:
```
"Please explain your implementation choices as you work"
"Add educational insights as you code"
```

## Example Output

```
★ Insight ─────────────────────────────────────
• Using dependency injection here allows for easier testing
  and swapping implementations without modifying this class
• The factory pattern abstracts object creation, keeping the
  client code decoupled from specific implementations
─────────────────────────────────────────────────
```

## Notes

- This adds additional tokens to output
- Insights are contextual to your specific codebase
- Focus is on practical learning, not general concepts
