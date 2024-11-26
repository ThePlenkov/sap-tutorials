---
title: "Enable OpenAPI/Swagger UI"
description: "Add OpenAPI documentation UI to your CAP service"
---

# Enable OpenAPI Documentation

Adding OpenAPI (Swagger) UI to your CAP service provides interactive API documentation and testing capabilities.

## Install Required Package

Install the Swagger UI package:

```bash
npm install cds-swagger-ui-express
```

That's it! The module is automatically detected and enabled.

## Enhance Service Documentation

For better API documentation, add annotations to your service definition. Update your `.cds` file:

```cds
/** Books Service - Manages book catalog and orders */
@path: 'catalog'
@title: 'Catalog Service'
@Core.LongDescription: 'This is a demo catalog service'
service CatalogService {
  /** Books available in the catalog */
  @readonly
  entity Books as projection on my.Books {
    /** Unique identifier of the book */
    key ID,
    /** Title of the book */
    title,
    /** Book's author */
    author,
    /** Current stock level */
    stock
  }
}
```

## Access Swagger UI

After deployment, access the Swagger UI at:

- `/api-docs` - OpenAPI specification
- `/swagger` - Interactive Swagger UI

## Features Available

The Swagger UI provides:

- Interactive API documentation
- Request/Response examples
- Test endpoints directly from the UI
- Model schemas
- Authentication information

> 💡 **Tip**: Use JSDoc-style comments in your CDS models to provide rich documentation in the Swagger UI.
