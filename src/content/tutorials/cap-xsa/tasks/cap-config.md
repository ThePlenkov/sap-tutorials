---
title: "Configuring CAP for XSA"
description: "Adapt your CAP project for deployment to XSA"
---

# Configuring CAP for XSA

Let's configure our CAP project to work with XSA.

## Project Setup

1. Create a new CAP project:
   ```bash
   cds init cap-xsa-app
   cd cap-xsa-app
   ```

2. Add sample data model:
   ```bash
   cds add tiny-sample
   ```

   This creates:
   - A basic data model in `db/schema.cds`
   - Sample data in `db/data/my.bookshop-Books.csv`
   - A service definition in `srv/cat-service.cds`

3. Add MTA support:
   ```bash
   cds add mta
   ```

4. Add HANA support:
   ```bash
   cds add hana
   ```

## Update Project Configuration

1. Update `package.json`:
   ```json
   {
     "name": "cap-xsa-app",
     "version": "1.0.0",
     "description": "CAP XSA Application",
     "repository": "<Add your repository URL here>",
     "license": "UNLICENSED",
     "private": true,
     "dependencies": {
       "@sap/cds": "^6",
       "@sap/hana-client": "^2",
       "@sap/xsenv": "^3",
       "express": "^4"
     },
     "devDependencies": {
       "@sap/hdi-deploy": "^4"
     },
     "scripts": {
       "start": "cds run",
       "watch": "cds watch",
       "build": "cds build/all",
       "deploy": "cds deploy"
     },
     "cds": {
       "requires": {
         "db": {
           "kind": "hana"
         }
       },
       "hana": {
         "deploy-format": "hdbtable"
       }
     }
   }
   ```

## Security Configuration

Create `xs-security.json`:
```json
{
  "xsappname": "cap-xsa-app",
  "tenant-mode": "shared",
  "scopes": [
    {
      "name": "$XSAPPNAME.Read",
      "description": "Read access"
    },
    {
      "name": "$XSAPPNAME.Write",
      "description": "Write access"
    }
  ],
  "role-templates": [
    {
      "name": "Viewer",
      "description": "View data",
      "scope-references": [
        "$XSAPPNAME.Read"
      ]
    },
    {
      "name": "Editor",
      "description": "Edit data",
      "scope-references": [
        "$XSAPPNAME.Read",
        "$XSAPPNAME.Write"
      ]
    }
  ]
}
```

## Project Structure

After configuration, your project structure should look like this:
```
cap-xsa-app/
├── db/
│   ├── schema.cds        # Generated from tiny-sample
│   └── data/            # Sample data
├── srv/
│   └── cat-service.cds  # Generated from tiny-sample
├── package.json
├── mta.yaml
└── xs-security.json
```

## Verify Setup

1. Build the project:
   ```bash
   cds build
   ```

2. Check the generated artifacts in the `gen/` folder:
   ```bash
   ls -la gen/db
   ls -la gen/srv
   ```

## Next Steps

In the next section, we'll explore how to use HANA-specific features in your CAP model.