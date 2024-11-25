---
title: "Dynamic Code Generation Security"
description: "Preventing security vulnerabilities in dynamically generated ABAP code"
order: 12
---

# Dynamic Code Generation Security

Dynamic code generation can bypass standard security checks and code scanners. Let's learn how to handle it securely.

## Dynamic Code Generation Risks

### 1. GENERATE Statement Risks

```abap
" DANGEROUS - Could generate malicious code
METHOD generate_unsafe_code.
  DATA(lt_source) = get_dynamic_source( ).  " Source from user input
  
  GENERATE SUBROUTINE POOL lt_source
    NAME DATA(lv_program).
    
  " The generated code could contain:
  " - Malicious database operations
  " - System calls
  " - Authorization bypasses
ENDMETHOD.
```

### 2. Code Scanner Evasion

```abap
" DANGEROUS - Evading code scanners
METHOD evade_scanner.
  DATA: lt_code TYPE TABLE OF string.
  
  " Split dangerous code into harmless-looking parts
  APPEND 'SELE' TO lt_code.
  APPEND 'CT * FR' TO lt_code.
  APPEND 'OM usr02' TO lt_code.
  
  " Combine and execute at runtime
  GENERATE SUBROUTINE POOL lt_code
    NAME DATA(lv_program).
ENDMETHOD.
```

## Secure Implementation

### 1. Code Generation Validation

```abap
METHOD validate_generated_code.
  IMPORTING
    it_source      TYPE string_table
  RETURNING
    VALUE(rv_safe) TYPE abap_bool.
    
  DATA: lo_scanner TYPE REF TO cl_abap_code_scanner.
  
  " Create code scanner
  lo_scanner = cl_abap_code_scanner=>create( ).
  
  " Define forbidden patterns
  lo_scanner->add_check(
    pattern     = 'SELECT.*FROM.*USR.*'
    description = 'Access to user tables not allowed'
  ).
  
  " Scan generated code
  DATA(lt_findings) = lo_scanner->scan( it_source ).
  
  " Check for security violations
  rv_safe = lt_findings IS INITIAL.
ENDMETHOD.
```

### 2. Secure Generation Framework

```abap
CLASS lcl_secure_generator DEFINITION.
  PUBLIC SECTION.
    METHODS:
      generate_code
        IMPORTING
          it_template TYPE string_table
          it_params   TYPE string_table
        RAISING
          cx_static_check,
          
      validate_template
        IMPORTING
          it_template TYPE string_table
        RAISING
          cx_static_check.
          
  PRIVATE SECTION.
    METHODS:
      check_forbidden_statements
        IMPORTING
          it_code TYPE string_table
        RAISING
          cx_static_check.
ENDCLASS.
```

## Best Practices

1. **Template-Based Generation**
   - Use predefined, validated templates
   - Never generate code from user input
   - Implement strict parameter validation

2. **Code Analysis**
   - Implement runtime code scanning
   - Use pattern matching for security checks
   - Maintain forbidden statement lists

3. **Access Control**
   - Restrict code generation to trusted users
   - Implement proper authorization checks
   - Log all code generation activities

## Security Measures

1. **White-list Approach**
   - Only allow pre-approved templates
   - Validate all parameters
   - Restrict generation scope

2. **Runtime Validation**
   ```abap
   METHOD validate_runtime.
     " Check execution context
     IF sy-batch = abap_true.
       RAISE EXCEPTION TYPE cx_not_allowed_in_batch.
     ENDIF.
     
     " Validate caller
     AUTHORITY-CHECK OBJECT 'S_DEVELOP'
       ID 'DEVCLASS' FIELD iv_devclass
       ID 'OBJTYPE' FIELD 'PROG'
       ID 'OBJNAME' FIELD iv_program
       ID 'P_GROUP' FIELD iv_auth_group.
       
     IF sy-subrc <> 0.
       RAISE EXCEPTION TYPE cx_no_authority.
     ENDIF.
   ENDMETHOD.
   ```

3. **Secure Storage**
   - Store templates in protected tables
   - Implement version control
   - Regular template audits

## Knowledge Check

Test your understanding of dynamic code generation security with the quiz below.