---
description: Teaches well-known prompt engineering techniques and patterns, including Anthropic best practices and agent persuasion principles
---

# Prompt Engineering

Well-known prompt engineering techniques and best practices.

## Core Principles

### 1. Be Specific
```
❌ "Write about AI"
✅ "Write a 500-word blog post explaining how AI is transforming healthcare, with 3 specific examples"
```

### 2. Provide Context
```
✅ "You are a senior software engineer reviewing code. Focus on security and performance."
```

### 3. Use Examples (Few-Shot)
```
✅ "Convert these sentences to formal tone:
   Input: Hey, what's up?
   Output: Hello, how are you?
   
   Input: That's sick!
   Output: That's impressive!
   
   Input: Gonna grab lunch
   Output: [Your turn]"
```

### 4. Chain of Thought
```
✅ "Let's think step by step:
   1. First, identify the main problem
   2. Then, list possible solutions
   3. Evaluate each solution
   4. Choose the best one"
```

## Techniques

### Role Prompting
```
"You are an expert in [field] with 20 years of experience..."
```

### Output Formatting
```
"Respond in JSON format with keys: title, summary, key_points"
```

### Constraints
```
"Keep response under 100 words. Use bullet points."
```

### Negative Prompting
```
"Do NOT include: code examples, technical jargon, or references to other sources"
```

## Prompting Patterns

| Pattern | Use When |
|---------|----------|
| Zero-shot | Simple, clear tasks |
| Few-shot | Need specific format/style |
| Chain-of-thought | Complex reasoning |
| Tree-of-thought | Multiple solution paths |
| ReAct | Need action + reasoning |

## Best Practices

1. **Iterate** - Refine prompts based on outputs
2. **Test variations** - Try different phrasings
3. **Break complex tasks** - Into smaller prompts
4. **Provide escape hatches** - "If unsure, say so"
5. **Use delimiters** - `"""`, `###`, `---` to separate sections
