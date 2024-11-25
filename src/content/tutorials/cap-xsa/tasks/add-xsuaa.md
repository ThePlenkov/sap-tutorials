---
title: "Add XSUAA Configuration"
description: "Configure authentication and authorization using XSUAA for XSA deployment"
---

# Add XSUAA Configuration

Before building our MTA for deployment, we need to configure authentication and authorization using XSUAA (XS User Authentication and Authorization).

## Add XSUAA Support

1. Run the following command to add XSUAA support:
   ```bash
   cds add xsuaa
   ```

> ⚠️ **Important**: The default XSUAA configuration is designed for Cloud Foundry. For XSA deployment, we need to make several adjustments to the `mta.yaml` file:
>
> 1. Change the XSUAA resource type from `org.cloudfoundry.managed-service` to `com.sap.xs.uaa`
> 2. Change the service plan from `application` to `default`
> 3. Update the database deployer module's buildpack to `sap_nodejs_buildpack`
>
> These changes are necessary because XSA uses different service types and plans compared to Cloud Foundry.

After applying the XSA-specific modifications, your `mta.yaml` should look like this:

```yaml
_schema-version: 3.3.0
ID: cap-workshop
version: 1.0.0
description: "A simple CAP project."
parameters:
  enable-parallel-deployments: true
build-parameters:
  before-all:
    - builder: custom
      commands:
        - npx cds build --production
modules:
  - name: cap-workshop-srv
    type: nodejs
    path: gen/srv
    parameters:
      buildpack: sap_nodejs_buildpack
      readiness-health-check-type: http
      readiness-health-check-http-endpoint: /health
    build-parameters:
      builder: custom
      commands: []
    provides:
      - name: srv-api
        properties:
          srv-url: ${default-url}
    requires:
      - name: cap-workshop-auth
      - name: cap-workshop-db

  - name: cap-workshop-db-deployer
    type: hdb
    path: gen/db
    parameters:
      buildpack: sap_nodejs_buildpack
    requires:
      - name: cap-workshop-db

resources:
  - name: cap-workshop-auth
    type: com.sap.xs.uaa
    parameters:
      service: xsuaa
      service-plan: default
      path: ./xs-security.json
      config:
        xsappname: cap-workshop-${org}-${space}
        tenant-mode: dedicated
  - name: cap-workshop-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
```

The command will also create `xs-security.json`:
```json
{
  "scopes": [],
  "attributes": [],
  "role-templates": []
}
```

And update `package.json` to include XSUAA configuration:
```json
{
  "cds": {
    "requires": {
      "auth": "xsuaa"
    }
  }
}
```

## Understanding XSUAA Configuration

1. **Security Configuration** (`xs-security.json`):
   - Defines scopes for authorization
   - Configures role templates
   - Sets up attributes for user information

2. **MTA Resources**:
   - `cap-workshop-auth`: XSUAA service instance
   - `cap-workshop-db`: HDI container for database

3. **Service Bindings**:
   - Application module requires XSUAA service
   - Automatic binding during deployment

## Next Steps

Now that we have configured XSUAA for XSA, we can proceed with building our MTA archive for deployment.