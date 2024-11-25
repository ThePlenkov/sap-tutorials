---
title: "Performance-Related Security"
description: "Preventing Denial of Service and performance-based attacks in ABAP"
order: 11
---

# Performance-Related Security

Learn how to prevent performance-based attacks and ensure your ABAP code remains secure under high load.

## Common Performance Vulnerabilities

### 1. Resource Exhaustion

```abap
" DON'T DO THIS - Vulnerable to memory exhaustion
METHOD read_all_data.
  SELECT *
    FROM huge_table
    INTO TABLE @DATA(lt_data).  " No limit!
    
  " Process data...
ENDMETHOD.

" CORRECT - With proper limits and pagination
METHOD read_data_safely.
  CONSTANTS: lc_batch_size TYPE i VALUE 1000.
  
  SELECT *
    FROM huge_table
    INTO TABLE @DATA(lt_data)
    UP TO @lc_batch_size ROWS
    WHERE created_date >= @iv_start_date.
    
  " Process batch...
ENDMETHOD.
```

### 2. Inefficient Queries

```abap
" DON'T DO THIS - Potential full table scan
SELECT SINGLE *
  FROM large_table
  INTO @DATA(ls_result)
  WHERE status = @iv_status.  " No index!

" CORRECT - Use proper indexes and specific fields
SELECT SINGLE id, name
  FROM large_table
  INTO @DATA(ls_result)
  WHERE status_idx = @iv_status.  " Using indexed field
```

## Prevention Strategies

### 1. Database Query Protection

```abap
METHOD protect_query.
  " Set query timeout
  cl_abap_dbquery=>set_timeout(
    EXPORTING
      seconds = 30
  ).
  
  " Implement row limiting
  SELECT *
    FROM large_table
    INTO TABLE @DATA(lt_result)
    UP TO 1000 ROWS
    WHERE condition = @iv_value.
    
  " Reset timeout
  cl_abap_dbquery=>reset_timeout( ).
ENDMETHOD.
```

### 2. Resource Monitoring

```abap
METHOD check_system_load.
  DATA: lv_cpu_usage TYPE i,
        lv_mem_usage TYPE i.
        
  " Check system resources before heavy operation
  CALL FUNCTION 'SYSTEM_GET_CPU_USAGE'
    IMPORTING
      cpu_usage = lv_cpu_usage.
      
  IF lv_cpu_usage > 80.
    RAISE EXCEPTION TYPE cx_resource_busy.
  ENDIF.
  
  " Proceed with operation...
ENDMETHOD.
```

## Best Practices

1. **Query Optimization**
   - Use appropriate indexes
   - Implement pagination
   - Avoid SELECT *
   - Set query timeouts

2. **Memory Management**
   - Use package size for large data
   - Implement garbage collection
   - Clear internal tables when done
   - Monitor memory consumption

3. **Workload Control**
   - Implement request throttling
   - Use asynchronous processing
   - Set transaction timeouts
   - Monitor system resources

4. **Code Efficiency**
   ```abap
   " DON'T DO THIS - Inefficient string operations in loop
   LOOP AT lt_data INTO DATA(ls_data).
     lv_result = lv_result && ls_data-text.  " String concatenation in loop
   ENDLOOP.

   " CORRECT - Use string buffer
   DATA(lo_string) = cl_abap_string_buffer=>create( ).
   LOOP AT lt_data INTO DATA(ls_data).
     lo_string->append( ls_data-text ).
   ENDLOOP.
   lv_result = lo_string->get_string( ).
   ```

## Security Measures

1. **Request Rate Limiting**
   ```abap
   METHOD limit_requests.
     DATA: lv_requests TYPE i.
     
     SELECT COUNT(*)
       FROM request_log
       INTO @lv_requests
       WHERE user_name = @sy-uname
         AND timestamp > @( cl_abap_context_info=>get_system_time( ) - 3600 ).
         
     IF lv_requests > 1000.
       RAISE EXCEPTION TYPE cx_rate_limit_exceeded.
     ENDIF.
   ENDMETHOD.
   ```

2. **Transaction Control**
   ```abap
   METHOD process_with_timeout.
     " Set transaction timeout
     SET RUN TIME ANALYZER ON.
     SET RUN TIME CLOCK ON.
     
     " Your processing logic here...
     
     GET RUN TIME FIELD DATA(lv_runtime).
     IF lv_runtime > 300000000.  " 300 seconds
       RAISE EXCEPTION TYPE cx_timeout.
     ENDIF.
   ENDMETHOD.
   ```

## Next Steps

Always test your applications under load and implement proper monitoring to detect and prevent performance-based attacks.