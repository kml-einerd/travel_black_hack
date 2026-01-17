---
description: Provides guidance for creating effective Claude Skills that extend capabilities with specialized knowledge, workflows, and tool integrations
---

# Skill Creator

Guide for creating effective Claude Skills.

## Skill Structure

```
skill-name/
├── SKILL.md           # Main skill definition
├── scripts/           # Reusable scripts
├── references/        # Documentation, schemas
└── assets/            # Templates, boilerplate
```

## SKILL.md Template

```markdown
---
name: my-skill
description: Brief description of what the skill does
license: MIT
---

# Skill Name

## Overview
What this skill does and when to use it.

## When to Use
- Use case 1
- Use case 2

## How to Use
Step-by-step instructions.

## Examples
Practical examples.
```

## Skill Creation Process

### 1. Identify the Need
- What task requires repetitive effort?
- What knowledge would help Claude?
- What scripts/templates could be reused?

### 2. Define Reusable Resources
- **scripts/**: Automation scripts
- **references/**: Documentation, schemas
- **assets/**: Templates, boilerplate code

### 3. Write the SKILL.md
- Purpose (few sentences)
- When to use
- How to use (with examples)

### 4. Test and Iterate
- Use the skill on real tasks
- Notice struggles or inefficiencies
- Update and improve

## Best Practices

1. **Use imperative form** - "To accomplish X, do Y"
2. **Be specific** - Include concrete examples
3. **Reference resources** - Point to scripts/references
4. **Keep it focused** - One skill, one purpose
5. **Make it actionable** - Claude should know what to do
