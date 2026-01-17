---
description: Security guidance hook - monitors and warns about potential security issues when editing files (XSS, eval, command injection, etc.)
---

# Security Guidance

Security reminder hook that warns about potential security issues when editing files.

## What It Does

Monitors 9 security patterns and warns when detected:

| Pattern | Risk | Example |
|---------|------|---------|
| **Command Injection** | Critical | `os.system(user_input)` |
| **XSS** | High | `innerHTML = userContent` |
| **eval Usage** | High | `eval(code)`, `exec(cmd)` |
| **Dangerous HTML** | Medium | Unsanitized HTML rendering |
| **Pickle Deserialization** | High | `pickle.loads(data)` |
| **os.system Calls** | High | `os.system("rm -rf")` |
| **SQL Injection** | Critical | String concatenation in queries |
| **Hardcoded Secrets** | High | `API_KEY = "abc123"` |
| **Weak Crypto** | Medium | `md5()`, `sha1()` for passwords |

## Usage

This hook activates automatically when editing files. No commands needed.

When a security issue is detected, you'll see:

```
⚠️ SECURITY WARNING
─────────────────────
Potential command injection detected in file.py

Risk: User input passed directly to shell command
Fix: Use subprocess with shell=False and input validation
```

## Patterns Monitored

### Command Injection
```python
# ❌ Dangerous
os.system(f"rm {user_input}")

# ✅ Safe
subprocess.run(["rm", validated_path], shell=False)
```

### XSS / Dangerous HTML
```javascript
// ❌ Dangerous
element.innerHTML = userContent;

// ✅ Safe
element.textContent = userContent;
```

### Eval / Exec
```python
# ❌ Dangerous
eval(user_code)

# ✅ Safe
ast.literal_eval(user_code)  # For simple literals only
```

### Hardcoded Secrets
```python
# ❌ Dangerous
API_KEY = "sk-abc123..."

# ✅ Safe
API_KEY = os.environ.get("API_KEY")
```

### SQL Injection
```python
# ❌ Dangerous
query = f"SELECT * FROM users WHERE id = {user_id}"

# ✅ Safe
cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
```

## When to Use

This hook is always active and provides guidance when:
- Writing code that handles user input
- Working with file operations
- Implementing authentication
- Making API calls with secrets
- Rendering user-generated content

## Benefits

- **Proactive warnings** before security issues reach production
- **Educational** - explains why patterns are dangerous
- **Non-blocking** - warns but allows you to proceed if needed
- **Framework-agnostic** - works with any language/framework
