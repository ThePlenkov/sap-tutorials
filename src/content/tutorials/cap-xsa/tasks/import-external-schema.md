---
title: "Import External Schema"
description: "Learn how to import and reference external HDI containers in your CAP model"
---

# Import External Schema

When working with existing HDI containers, you can import their schemas into your CAP model. This allows you to:
- Reference existing tables and views
- Create projections on external entities
- Maintain type safety and documentation

## Prerequisites

1. First, ensure you have configured access to the external HDI container in your `mta.yaml`:
   ```yaml
   resources:
     - name: sflight-db
       type: org.cloudfoundry.existing-service
       parameters:
         service-name: sflight-db  # Name of your existing HDI container

   modules:
     - name: cap-workshop-srv
       requires:
         - name: sflight-db  # Reference the existing HDI container
   ```

   > 💡 **Tip**: This configuration was covered in the "Connect to Existing HDI Container" tutorial.

## Install Required Tools

1. Install the hana2cds CLI utility:
   ```bash
   npm install -D hana2cds
   ```

## Obtain Database Credentials

To run commands like `hana2cds`, you need to have `cds.requires.db.credentials` available. One of the simplest ways to obtain these credentials is as follows:

1. After connecting the existing HDI container, build and deploy your MTA project again to XSA. This will bind at least two HDI containers to your CAP module via service binding keys.

2. Run the following command to export the environment variables to a JSON file:
   ```bash
   xs env my-cap-service-name --export-json=default-env.json
   ```
   Replace `my-cap-service-name` with the name of your XSA application serving CAP.

3. Store the `default-env.json` file in the root of your project or in the `db` folder. Ensure that both HDI containers are present with credentials for the current schema and the exported schema.

## Import External Schema

Once the credentials are available, you can import the external schema using the `hana2cds` CLI:

1. Run the following command to import tables and views from the HDI container into a JSON file in CSN format:
   ```bash
   CDS_ENV=production npx hana2cds --service=sflight-db > models/sflight/schema.csn.json
   ```
   Here, `sflight-db` is the name of the external HDI service.

2. Convert the CSN file to CDL format for improved code readability:
   ```bash
   npx cds compile models/sflight/schema.csn.json --to cdl > models/sflight/schema.cds
   ```

   > **Note**: While CSN is the same representation from the perspective of CAP and offers better performance, generating the CDL file can improve code readability.

## Understanding Generated Schema

After running the import commands, you'll get CDS entities with special annotations indicating they are external:

```cds
@cds.persistence.exists : true
entity ANALYTICSSERVICE_AIRLINE {
  AIRLINEID : String(3);
  NAME : String(40);
  CURRENCYCODE_CODE : String(3);
  AIRLINEPICURL : String(5000);
};
```

The `@cds.persistence.exists` annotation tells CAP that:
- The table/view already exists in another schema
- No DDL statements should be generated for this entity
- The object should be referenced via synonyms

## HDI Synonyms

Even though the external schema is imported, you still need to create synonyms for the tables and views in your current schema to access them.

[to be continued...]

## Next Steps

After importing the external schema:
- Create synonyms/synonym configs for the imported tables and views
- Aff hdbgrants to be able to grant access to the imported objects
- Test the integrated model

> 💡 **Tip**: Make sure your HDI container binding is working before proceeding with schema import. 