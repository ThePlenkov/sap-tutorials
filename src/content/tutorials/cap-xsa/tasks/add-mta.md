---
title: "Add MTA Support"
description: "Configure Multi-Target Application (MTA) support for XSA deployment"
---

# Add MTA Support

To deploy our CAP application to XSA, we need to configure it as a Multi-Target Application (MTA). Let's add the necessary configuration.

## Add MTA Support

1. Run the following command to add MTA support:
   ```bash
   cds add mta
   ```
This command creates an `mta.yaml` file.

> ⚠️ The default MTA configuration uses `nodejs_buildpack` which is for Cloud Foundry. For XSA deployment, you must manually change the buildpack from `nodejs_buildpack` to `sap_nodejs_buildpack` in your `mta.yaml` file. You can see list of available buildpacks with `xs buildpacks` command

> ⚠️ By default, `cds add mta` configures the Node.js module with `builder: npm`, which copies `node_modules` from your local workspace. This can cause compatibility issues if you're developing with a newer Node.js version than what's available in XSA buildpacks. For better reliability, modify the configuration to install dependencies during deployment instead.

You can do this like this:

```
modules:
  - name: cap-workshop-srv
    parameters:
      buildpack: sap_nodejs_buildpack
    build-parameters:
      builder: custom
      commands: []
```

After applying the necessary modifications for XSA deployment, it should look like this:
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
        - npm ci
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
      - name: srv-api # required by consumers of CAP services (e.g. approuter)
        properties:
          srv-url: ${default-url}
    requires: []
```

## Understanding MTA Configuration

Key components of the MTA configuration:

1. **Schema Version**: Defines the MTA descriptor schema version
2. **ID**: Unique identifier for your application
3. **Modules**: Different components of your application
4. **Resources**: Required services and configurations
5. **Parameters**: Build and deployment settings

## Best Practices

1. Use meaningful and consistent naming
2. Configure appropriate resource limits
3. Define clear module dependencies
4. Include necessary health checks
5. Enable parallel deployments when possible

## Next Steps

Now that we have MTA support, we'll build our application for deployment.