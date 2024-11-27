---
title: "Connect to Existing HDI Container"
description: "Learn how to connect your CAP application to an existing HDI container in XSA"
---

# Connect to Existing HDI Container

Sometimes you need to connect your CAP application to an existing HDI container instead of creating a new one. This is common when:
- Sharing database objects between applications
- Migrating from an existing application
- Working with predefined schemas

## Update MTA Configuration

1. Reference the existing HDI container in your `mta.yaml`:
   ```yaml
   resources:
     - name: sflight-db
       type: org.cloudfoundry.existing-service
       parameters:
         service-name: sflight-db  # Name of your existing HDI container

   modules:
     - name: cap-workshop-srv
       type: nodejs
       path: gen/srv
       parameters:
         buildpack: sap_nodejs_buildpack
       requires:
         - name: sflight-db  # Reference the existing HDI container
   ```

   > 💡 **Tip**: Replace `sflight-db` with the actual name of your HDI container. You can find existing containers using `xs services`.

## Test the Connection

1. Deploy your application:
   ```bash
   xs deploy
   ```

2. Verify the binding:
   ```bash
   xs service-key sflight-db default
   ```

## Next Steps

After connecting to the existing HDI container:
- Test database access
- Verify entity projections
- Check service bindings

> ⚠️ **Important**: Make sure the HDI container exists before deployment. You can check available services using `xs s`. 