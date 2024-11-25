---
title: "Preventing SQL Injection"
description: "Learn how to write secure SQL queries and prevent injection attacks"
order: 3
---

# Preventing SQL Injection

SQL injection remains one of the most critical security vulnerabilities in ABAP applications. Let's learn how to prevent it.

## Understanding SQL Injection

SQL injection occurs when untrusted input is used directly in SQL statements, allowing attackers to modify the query's logic.

### Vulnerable Code Example

```abap
" DON'T DO THIS - Vulnerable to SQL injection
DATA: lv_where TYPE string.
lv_where = |WHERE name LIKE '%{ iv_search }%'|.
SELECT * FROM users 
  INTO TABLE @DATA(lt_users)
  WHERE (lv_where).
```

## Safe SQL Practices

### 1. Use OpenSQL with Bind Parameters

```abap
" CORRECT - Safe from SQL injection
SELECT * FROM users 
  INTO TABLE @DATA(lt_users)
  WHERE name LIKE @( |%{ cl_abap_dyn_prg=>escape( iv_search ) }%| ).
```

### 2. Prepared Statements

```abap
" Using prepared statements
DATA(lo_sql) = cl_sql_statement=>create( ).
DATA(lo_params) = lo_sql->create_parameters( ).
lo_params->add_parameter( '%' && iv_search && '%' ).

DATA(lv_sql) = 'SELECT * FROM users WHERE name LIKE ?'.
DATA(lo_result) = lo_sql->execute_query( 
  statement = lv_sql
  parameters = lo_params 
).
```

## Best Practices

1. Always use parameterized queries
2. Validate and sanitize all input
3. Use proper escaping functions
4. Implement proper error handling
5. Use minimum required database privileges

## Common Pitfalls

1. String concatenation in queries
2. Dynamic WHERE conditions
3. Trusting client-side validation
4. Using direct user input in queries

## Next Steps

In the next section, we'll explore proper authorization checks and access control.