---
title: "Enable GraphQL Support"
description: "Add and configure GraphQL endpoints for your CAP service"
---

# Enable GraphQL Support

CAP provides built-in GraphQL support, allowing you to expose your services via GraphQL endpoints alongside REST/OData.

## Add GraphQL Support

1. Install the required package:
   ```bash
   npm install @cap-js/graphql
   ```

2. Update your `package.json` to enable GraphQL:
   ```json
   {
     "cds": {
       "requires": {
         "graphql": true
       }
     }
   }
   ```

3. Add the `@graphql` annotation to your service in `srv/cat-service.cds`:
   ```cds
   using my.bookshop as my from '../db/schema';

   @graphql
   service CatalogService {
       @readonly entity Books as projection on my.Books;
   }
   ```

## Testing GraphQL Queries

After deployment, you can access the GraphQL playground at:
- `/graphql` - GraphQL endpoint
- `/graphql/editor` - Interactive GraphQL editor

Here are some example queries to test:

1. **Basic Books Query**:
   ```graphql
   query {
     CatalogService {
       Books {
         nodes {
           ID
           title
           stock
         }
       }
     }
   }
   ```

2. **Filtered Query**:
   ```graphql
   query {
     CatalogService {
       Books(where: { stock_gt: 50 }) {
         nodes {
           ID
           title
           stock
         }
       }
     }
   }
   ```

3. **Search and Sort**:
   ```graphql
   query {
     CatalogService {
       Books(
         search: "Jane"
         order: [{ stock: DESC }]
       ) {
         nodes {
           ID
           title
           stock
         }
       }
     }
   }
   ```

4. **Pagination**:
   ```graphql
   query {
     CatalogService {
       Books(
         limit: 5
         offset: 0
       ) {
         nodes {
           ID
           title
           stock
         }
         pageInfo {
           hasNextPage
           hasPreviousPage
         }
       }
     }
   }
   ```

## Understanding GraphQL Features

1. **Filtering Options**:
   - `_eq`: Equal
   - `_ne`: Not equal
   - `_gt`: Greater than
   - `_ge`: Greater than or equal
   - `_lt`: Less than
   - `_le`: Less than or equal
   - `_between`: Between two values

2. **Sorting**:
   - `ASC`: Ascending order
   - `DESC`: Descending order

3. **Search**:
   - Full-text search across all searchable fields
   - Uses HANA's built-in text search capabilities

## Security Considerations

1. **Query Depth**:
   Add query depth limits in `package.json`:
   ```json
   {
     "cds": {
       "graphql": {
         "maxQueryDepth": 5
       }
     }
   }
   ```

2. **Field Selection**:
   Restrict available fields in your service definition:
   ```cds
   @graphql
   service CatalogService {
     @readonly entity Books as projection on my.Books excluding {
       sensitive_field
     };
   }
   ```

## CSRF Configuration

Since GraphQL doesn't support CSRF tokens, we need to configure a dedicated route in the approuter. Update your `app/router/xs-app.json`:

```json
{
  "routes": [
    {
      "source": "^/app/(.*)$",
      "target": "$1",
      "localDir": ".",
      "cacheControl": "no-cache, no-store, must-revalidate"
    },
    {
      "source": "^/appconfig/",
      "localDir": ".",
      "cacheControl": "no-cache, no-store, must-revalidate"
    },
    {
      "source": "^/graphql/(.*)$",
      "target": "/graphql/$1",
      "destination": "srv-api",
      "csrfProtection": false
    },
    {
      "source": "^/(.*)$",
      "target": "$1",
      "destination": "srv-api",
      "csrfProtection": true
    }
  ]
}
```

> ⚠️ **Important**: The GraphQL route must be placed before the catch-all route to ensure proper routing order.

## Next Steps

With GraphQL enabled, you can now:
- Build rich queries with precise field selection
- Implement complex filtering
- Use pagination for large datasets
- Optimize data fetching with single requests

> 💡 **Tip**: Use the GraphQL playground's documentation explorer to discover all available query options and schema details.