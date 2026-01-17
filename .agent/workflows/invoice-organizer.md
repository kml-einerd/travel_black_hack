---
description: Automatically organizes invoices and receipts for tax preparation by reading files, extracting information, and renaming consistently
---

# Invoice Organizer

Organize invoices and receipts for tax preparation.

## When to Use
- Tax season preparation
- Expense tracking
- Receipt organization
- Financial record keeping

## Process

### 1. Gather Invoices

Collect from:
- Email attachments
- Downloads folder
- Scanner folder
- Cloud storage

### 2. Extract Information

For each invoice, extract:
- Date
- Vendor name
- Amount
- Category
- Invoice number

### 3. Rename Files

**Naming Convention:**
```
YYYY-MM-DD_Vendor_Amount_Category.pdf
```

**Examples:**
```
2024-01-15_Amazon_49.99_Office.pdf
2024-01-20_Uber_25.00_Transport.pdf
2024-02-01_Adobe_54.99_Software.pdf
```

### 4. Organize Folders

```
Invoices/
├── 2024/
│   ├── Q1/
│   │   ├── 01-January/
│   │   ├── 02-February/
│   │   └── 03-March/
│   ├── Q2/
│   └── ...
└── Categories/
    ├── Office/
    ├── Software/
    ├── Transport/
    └── Utilities/
```

### 5. Create Summary

```markdown
# Invoice Summary - 2024

## By Category
| Category | Count | Total |
|----------|-------|-------|
| Software | 12 | $648.00 |
| Office | 8 | $234.50 |
| Transport | 15 | $412.00 |

## By Month
| Month | Count | Total |
|-------|-------|-------|
| January | 10 | $523.00 |
| February | 8 | $412.00 |

## Total: $X,XXX.XX
```

## Automation Script

```python
import os
import re
from datetime import datetime

def rename_invoice(filepath, vendor, amount, category):
    date = datetime.now().strftime('%Y-%m-%d')
    ext = os.path.splitext(filepath)[1]
    new_name = f"{date}_{vendor}_{amount}_{category}{ext}"
    new_path = os.path.join(os.path.dirname(filepath), new_name)
    os.rename(filepath, new_path)
    return new_path
```

## Best Practices

- Process invoices weekly
- Use consistent category names
- Keep originals as backup
- Export summary for accountant
