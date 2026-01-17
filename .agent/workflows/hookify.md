---
description: Create custom hooks to prevent unwanted behaviors - analyze conversations or create explicit rules with regex patterns
---

# Hookify - Custom Behavior Rules

Easily create custom hooks to prevent unwanted behaviors by analyzing conversation patterns or from explicit instructions.

## Overview

Hookify makes it simple to create behavior rules without editing complex configuration files. Just describe what you want to prevent or warn about.

**Key features:**
- 🎯 Analyze conversations to find unwanted behaviors automatically
- 📝 Simple markdown configuration with YAML frontmatter
- 🔍 Regex pattern matching for powerful rules
- 🚀 No coding required - just describe the behavior
- 🔄 No restart needed - rules take effect immediately

## Quick Start

### Create Your First Rule

```bash
/hookify Warn me when I use rm -rf commands
```

This creates `.claude/hookify.warn-rm.local.md` automatically.

### Test It Immediately

Ask Claude to run a command that should trigger:
```
Run rm -rf /tmp/test
```

You'll see the warning message immediately!

## Usage

### Main Command: `/hookify`

**With arguments (explicit rule):**
```bash
/hookify Don't use console.log in TypeScript files
```

**Without arguments (analyze conversation):**
```bash
/hookify
```
Analyzes recent conversation to find behaviors you've corrected or been frustrated by.

### Helper Commands

```bash
/hookify:list      # List all rules
/hookify:configure # Enable/disable rules interactively
/hookify:help      # Get help
```

## Rule Examples

### Block Dangerous Commands
```markdown
---
name: block-dangerous-rm
enabled: true
event: bash
pattern: rm\s+-rf|dd\s+if=|mkfs|format
action: block
---

🛑 **Destructive operation detected!**
This command can cause data loss. Operation blocked.
```

### Warn About Debug Code
```markdown
---
name: warn-debug-code
enabled: true
event: file
pattern: console\.log\(|debugger;|print\(
action: warn
---

🐛 **Debug code detected**
Remember to remove debugging statements before committing.
```

### Warn About Sensitive Files
```markdown
---
name: warn-sensitive-files
enabled: true
event: file
conditions:
  - field: file_path
    operator: regex_match
    pattern: \.env$|credentials|secrets
  - field: new_text
    operator: contains
    pattern: KEY
---

🔐 **Sensitive file edit detected!**
Ensure credentials are not hardcoded and file is in .gitignore.
```

### Require Tests Before Stopping
```markdown
---
name: require-tests-run
enabled: false
event: stop
action: block
conditions:
  - field: transcript
    operator: not_contains
    pattern: npm test|pytest|cargo test
---

**Tests not detected!**
Please run tests to verify your changes before stopping.
```

## Event Types

| Event | Triggers On |
|-------|-------------|
| `bash` | Bash tool commands |
| `file` | Edit, Write, MultiEdit tools |
| `stop` | When Claude wants to stop |
| `prompt` | User prompt submission |
| `all` | All events |

## Action Types

| Action | Behavior |
|--------|----------|
| `warn` | Shows warning but allows operation (default) |
| `block` | Prevents operation from executing |

## Pattern Syntax (Regex)

| Pattern | Matches | Example |
|---------|---------|---------|
| `rm\s+-rf` | rm -rf | rm -rf /tmp |
| `console\.log\(` | console.log( | console.log("test") |
| `(eval\|exec)\(` | eval( or exec( | eval("code") |
| `\.env$` | files ending in .env | .env, .env.local |
| `chmod\s+777` | chmod 777 | chmod 777 file.txt |

## Operators

| Operator | Description |
|----------|-------------|
| `regex_match` | Pattern must match |
| `contains` | String must contain pattern |
| `equals` | Exact string match |
| `not_contains` | String must NOT contain pattern |
| `starts_with` | String starts with pattern |
| `ends_with` | String ends with pattern |

## Fields for Conditions

**For bash events:**
- `command`: The bash command string

**For file events:**
- `file_path`: Path to file being edited
- `new_text`: New content being added
- `old_text`: Old content being replaced

**For prompt events:**
- `user_prompt`: The user's submitted prompt

## Management

```bash
# Enable/disable - edit the file and set enabled: true/false

# Delete rule
rm .claude/hookify.my-rule.local.md

# View all rules
/hookify:list
```
