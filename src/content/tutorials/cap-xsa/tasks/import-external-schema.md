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

1. Install the CDS generator utility:
   ```bash
   npm install -D cdsgen
   ```

[Awaiting next steps for schema import using cdsgen...]

## Next Steps

After setting up the HDI container connection:
- Generate CDS models from the external schema
- Create projections and views
- Test the integrated model

> 💡 **Tip**: Make sure your HDI container binding is working before proceeding with schema import. 