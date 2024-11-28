---
title: "XSA Migration Checklist"
description: "Complete list of changes required to migrate a CAP application to XSA"
---

# XSA Migration Checklist

When migrating a CAP application from Cloud Foundry to XSA, several adjustments are necessary. This checklist helps ensure you've covered all the required changes.

## XSUAA Configuration

1. In `mta.yaml`, change the XSUAA service type and plan:
   ```yaml
   resources:
     - name: cap-workshop-auth
       # FROM:
       # type: org.cloudfoundry.managed-service
       # service-plan: application
       # TO:
       type: com.sap.xs.uaa
       parameters:
         service: xsuaa
         service-plan: default  # Must be 'default' in XSA
         path: ./xs-security.json
         config:
           xsappname: cap-workshop-${org}-${space}
           tenant-mode: dedicated
   ```

   > ⚠️ **Important**: XSA uses different service types and plans compared to Cloud Foundry:
   > - Change service type to `com.sap.xs.uaa`
   > - Change service plan from `application` to `default`

## Remove Unsupported Services

1. Check available XSA services using:
   ```bash
   xs marketplace
   # or
   xs m
   ```

2. Remove resources that aren't available in XSA marketplace. Common services to remove:
   ```yaml
   resources:
     # Remove these if present:
     # - name: cap-workshop-destination
     #   type: org.cloudfoundry.managed-service
     #   parameters:
     #     service: destination
     
     # - name: cap-workshop-connectivity
     #   type: org.cloudfoundry.managed-service
     #   parameters:
     #     service: connectivity

     # - name: cap-workshop-logging
     #   type: org.cloudfoundry.managed-service
     #   parameters:
     #     service: application-logs

     # Keep only XSA-supported services like:
     - name: cap-workshop-auth
       type: com.sap.xs.uaa
       
     - name: cap-workshop-db
       type: com.sap.xs.hdi-container
   ```

   > ⚠️ **Important**: Only include services that are available in your XSA environment. Using unsupported services will cause deployment failures.

## Buildpack Changes

1. Update all module buildpacks from `nodejs_buildpack` to `sap_nodejs_buildpack`:
   ```yaml
   modules:
     - name: cap-workshop-srv
       parameters:
         # FROM:
         # buildpack: nodejs_buildpack
         # TO:
         buildpack: sap_nodejs_buildpack

     - name: cap-workshop-db-deployer
       parameters:
         buildpack: sap_nodejs_buildpack

     - name: cap-workshop-approuter
       parameters:
         buildpack: sap_nodejs_buildpack
   ```

   > ⚠️ **Important**: XSA requires the SAP-specific buildpack. Using the standard Cloud Foundry buildpack will cause deployment failures.

## Next Steps

After completing all the migration steps, you can:
- Build your MTA archive
- Deploy to XSA
- Test the application functionality

> 💡 **Tip**: Always test your application thoroughly after migration, as some behaviors might differ between Cloud Foundry and XSA environments. 