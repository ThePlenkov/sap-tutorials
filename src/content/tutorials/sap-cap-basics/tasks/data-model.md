---
title: "Defining the Data Model"
description: "Create and understand the CDS data model for your application"
tutorialId: "sap-cap-basics"
order: 3
---

# Defining the Data Model

Let's create a simple bookshop data model using CDS.

## Create the Schema

1. Create `db/schema.cds`:
   ```cds
   namespace my.bookshop;

   entity Books {
     key ID : Integer;
     title  : String;
     author : String;
     stock  : Integer;
   }
   ```

## Understanding CDS

- `namespace`: Organizes entities
- `entity`: Defines a database table
- `key`: Primary key field
- Type system: `String`, `Integer`, etc.

## Deployment

Deploy the model:
```bash
cds deploy --to sqlite
```

## Next Steps

Next, we'll create a service to expose our data model.