---
title: "Creating a CAP Service"
description: "Create a service layer to expose your data model via REST APIs"
tutorialId: "sap-cap-basics"
order: 4
---

# Creating a CAP Service

Now we'll create a service to expose our data model via REST APIs.

## Service Definition

1. Create `srv/cat-service.cds`:
   ```cds
   using my.bookshop as my from '../db/schema';

   service CatalogService {
     entity Books as projection on my.Books;
   }
   ```

## Service Implementation

2. Create `srv/cat-service.js`:
   ```javascript
   module.exports = (srv) => {
     srv.after('READ', 'Books', (each) => {
       console.log('Read Books:', each);
     });
   }
   ```

## Testing

Start the service:
```bash
cds watch
```

Access: http://localhost:4004/catalog/Books

## Next Steps

In the final task, we'll add sample data and test our service.