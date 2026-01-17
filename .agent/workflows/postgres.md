---
description: Execute safe read-only SQL queries against PostgreSQL databases with multi-connection support
---

# PostgreSQL Database Queries

Execute safe read-only SQL queries against PostgreSQL.

## When to Use
- Analyzing data in PostgreSQL
- Generating reports
- Exploring database structure
- Running read-only queries

## Connection

```python
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="user",
    password="password"
)
```

## Common Queries

### List Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### Table Structure
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users';
```

### Count Rows
```sql
SELECT COUNT(*) FROM users;
```

### Sample Data
```sql
SELECT * FROM users LIMIT 10;
```

## Safety Rules

1. **READ-ONLY** - Only SELECT queries
2. **No modifications** - No INSERT, UPDATE, DELETE
3. **No DDL** - No CREATE, ALTER, DROP
4. **Use LIMIT** - Prevent large result sets
5. **Timeout** - Set query timeout

## Python Example

```python
import psycopg2
from psycopg2.extras import RealDictCursor

def query_db(sql, conn_string):
    with psycopg2.connect(conn_string) as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(sql)
            return cur.fetchall()

# Usage
results = query_db(
    "SELECT * FROM users LIMIT 10",
    "postgresql://user:pass@localhost/db"
)
```

## Environment Variables

Store credentials safely:
```bash
export PGHOST=localhost
export PGDATABASE=mydb
export PGUSER=user
export PGPASSWORD=password
```

Then connect without params:
```python
conn = psycopg2.connect()
```
