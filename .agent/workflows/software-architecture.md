---
description: Design patterns including Clean Architecture, SOLID principles, and software design best practices
---

# Software Architecture Patterns

Implements design patterns including Clean Architecture, SOLID principles, and comprehensive software design best practices.

## SOLID Principles

### S - Single Responsibility
Each class/function should have one reason to change.

```typescript
// ❌ Bad: Multiple responsibilities
class UserService {
  createUser() { }
  sendEmail() { }
  logActivity() { }
}

// ✅ Good: Single responsibility
class UserService { createUser() { } }
class EmailService { sendEmail() { } }
class ActivityLogger { logActivity() { } }
```

### O - Open/Closed
Open for extension, closed for modification.

### L - Liskov Substitution
Subtypes must be substitutable for their base types.

### I - Interface Segregation
Many specific interfaces > one general interface.

### D - Dependency Inversion
Depend on abstractions, not concretions.

## Clean Architecture

```
┌─────────────────────────────────────┐
│           Frameworks                │  ← External (UI, DB, Web)
├─────────────────────────────────────┤
│         Interface Adapters          │  ← Controllers, Gateways
├─────────────────────────────────────┤
│          Use Cases                  │  ← Application Logic
├─────────────────────────────────────┤
│           Entities                  │  ← Business Rules
└─────────────────────────────────────┘
```

**Dependency Rule:** Dependencies point inward. Inner layers don't know about outer layers.

## Design Patterns

### Creational
- **Factory**: Create objects without specifying exact class
- **Builder**: Construct complex objects step by step
- **Singleton**: Single instance, global access

### Structural
- **Adapter**: Convert interface to another
- **Decorator**: Add behavior dynamically
- **Facade**: Simplified interface to complex subsystem

### Behavioral
- **Observer**: Notify dependents of state changes
- **Strategy**: Interchangeable algorithms
- **Command**: Encapsulate request as object

## Best Practices

1. **Favor composition over inheritance**
2. **Program to interfaces, not implementations**
3. **Separate concerns clearly**
4. **Keep it simple (YAGNI)**
5. **Don't repeat yourself (DRY)**
6. **Make wrong states unrepresentable**

## When to Apply

- Designing new systems
- Refactoring existing code
- Making architectural decisions
- Code reviews
- Planning features
