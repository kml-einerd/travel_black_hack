---
description: Continuous improvement methodology with Kaizen philosophy - small iterative improvements, error-proof designs, avoid over-engineering
---

# Kaizen: Continuous Improvement

Small improvements, continuously. Error-proof by design. Follow what works. Build only what's needed.

## The Four Pillars

### 1. Continuous Improvement (Kaizen)

Small, frequent improvements compound into major gains.

**Incremental over revolutionary:**
- Make smallest viable change that improves quality
- One improvement at a time
- Verify each change before next

**Always leave code better:**
- Fix small issues as you encounter them
- Refactor while you work (within scope)
- Update outdated comments
- Remove dead code when you see it

**Iterative refinement:**
1. First version: make it work
2. Second pass: make it clear
3. Third pass: make it efficient
4. Don't try all three at once

### 2. Poka-Yoke (Error Proofing)

Design systems that prevent errors at compile/design time, not runtime.

```typescript
// ❌ Bad: string can be anything
type Order = { status: string; };

// ✅ Good: Only valid states
type OrderStatus = 'pending' | 'processing' | 'shipped';
type Order = { status: OrderStatus; };
```

### 3. Validate at Boundaries

```typescript
// Validate once at boundary, safe everywhere else
const handlePaymentRequest = (req: Request) => {
  const amount = validatePositive(req.body.amount); // Validate once
  processPayment(amount); // Use everywhere safely
};
```

### 4. Guard Clauses

```typescript
const processUser = (user: User | null) => {
  if (!user) return;
  if (!user.email) return;
  if (!user.isActive) return;
  
  // Main logic here, guaranteed valid
  sendEmail(user.email, 'Welcome!');
};
```

## In Practice

**When implementing features:**
1. Start with simplest version that works
2. Add one improvement (error handling, validation, etc.)
3. Test and verify
4. Repeat if time permits

**When refactoring:**
- Fix one smell at a time
- Commit after each improvement
- Keep tests passing throughout
- Stop when "good enough"

**Philosophy:** Quality through incremental progress and prevention, not perfection through massive effort.
