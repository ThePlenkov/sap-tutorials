---
title: "Deploying MTA to XSA"
description: "Deploy your Multi-Target Application to SAP HANA XSA"
---

# Deploying MTA to XSA

After building our MTA archive, let's deploy it to the XSA platform.

> ⚠️ **Important**: Before deploying to XSA, make sure the `@sap/xssec` package is installed in your project. Install it using:
> ```bash
> npm install @sap/xssec
> ```

## Prerequisites

- Successful MTA build from previous step
- XS CLI configured and connected to XSA
- Proper authorizations in target space

## Deploy Process

1. Verify your target space:
   ```bash
   xs target
   ```

2. Deploy the MTA archive:
   ```bash
   xs deploy mta_archives/cap-workshop.mtar
   ```

   Alternatively you can add the command like this:

   ```bash
   npm pkg set scripts.deploy="xs deploy mta_archives/\${npm_package_name}.mtar --abort-on-error"
   ```

The deployment process:
- Validates the MTA archive
- Creates/updates required services
- Deploys application modules
- Establishes dependencies
- Starts applications

## Monitor Deployment

1. Check deployment status:
   ```bash
   xs mta cap-workshop
   ```

2. View application status:
   ```bash
   xs apps
   ```

3. Check application logs:
   ```bash
   xs logs cap-workshop-srv --recent
   ```

## Verify Deployment

1. Get the application URL:
   ```bash
   xs app cap-workshop-srv
   ```

2. Test the service endpoints:
   - Browse to the application URL
   - Append `/catalog` to access the OData service

## Troubleshooting

If deployment fails:

1. Check logs for errors:
   ```bash
   xs deploy mta_archives/cap-workshop.mtar --verbose
   ```

2. Verify resource availability:
   ```bash
   xs services
   xs marketplace
   ```

3. Common issues:
   - Insufficient memory quota
   - Missing service instances
   - Invalid service bindings
   - Network connectivity issues

## Next Steps

Now that your application is deployed, we'll explore how to monitor and maintain it in production.