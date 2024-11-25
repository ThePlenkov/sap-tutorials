---
title: "Define the Data Model"
description: "Create or customize your CAP data model for XSA deployment"
---

# Define the Data Model

Let's set up our data model for the XSA application. If you haven't completed the CAP basics tutorial or need a fresh start, you can quickly initialize a sample model.

## Initialize Sample Model

1. Run the following command to create a basic model:
   ```bash
   cds add tiny-sample
   ```

This command creates:
- A basic data model in `db/schema.cds`:
  ```cds
  namespace my.bookshop;

  entity Books {
    key ID : Integer;
    title  : String;
    stock  : Integer;
  }
  ```

- Sample data in `db/data/my.bookshop-Books.csv`:
  ```csv
  ID,title,stock
  1,Wuthering Heights,100
  2,Jane Eyre,500
  ```

- A service definition in `srv/cat-service.cds`:
  ```cds
  using my.bookshop as my from '../db/schema';

  service CatalogService {
      @readonly entity Books as projection on my.Books;
  }
  ```

## Understanding the Model

Key aspects of CAP data models:

1. **Namespace**: Organizes entities and prevents naming conflicts
2. **Entities**: Define your database tables
3. **Types**: CAP provides various types that map to HANA column types
4. **Associations**: Define relationships between entities
5. **Annotations**: Add metadata for service behavior

## Best Practices

1. Use meaningful namespaces to avoid conflicts
2. Follow naming conventions:
   - PascalCase for entity names
   - camelCase for property names
3. Define appropriate field lengths
4. Use associations to model relationships
5. Add proper annotations for service behavior

## Next Steps

Now that we have our data model defined, we'll configure our CAP project for XSA deployment.