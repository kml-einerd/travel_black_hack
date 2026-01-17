---
description: Automatically converts any documentation website into a Claude AI skill in minutes
---

# Skill Seekers

Convert any documentation website into a Claude skill.

## Process

### 1. Identify the Documentation
- Official docs URL
- API reference
- Tutorial pages
- Example code

### 2. Extract Key Information

**For each page:**
- Main concepts
- Code examples
- Important parameters
- Common patterns
- Error handling

### 3. Structure as Skill

```markdown
---
name: [library-name]
description: [What it does and when to use]
---

# [Library Name]

## Overview
[Brief description]

## When to Use
- [Use case 1]
- [Use case 2]

## Quick Start
[Minimal working example]

## Common Patterns

### Pattern 1: [Name]
[Code example]

### Pattern 2: [Name]
[Code example]

## API Reference

### [Function/Method]
- **Parameters**: [list]
- **Returns**: [type]
- **Example**: [code]

## Common Issues
- [Issue 1]: [Solution]
- [Issue 2]: [Solution]
```

### 4. Validate

Test the skill by asking questions:
- "How do I do X with [library]?"
- "What's the syntax for Y?"
- "Debug this error..."

### 5. Iterate

Improve based on:
- Missing information
- Unclear explanations
- Common follow-up questions

## Tips

- **Focus on practical use** - Not everything in docs is useful
- **Include examples** - Code speaks louder than descriptions
- **Update regularly** - Docs change
- **Add troubleshooting** - Common errors and fixes
