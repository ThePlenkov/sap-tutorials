---
title: "Add Application Router"
description: "Configure the Application Router for authentication handling in XSA"
---

# Add Application Router

The Application Router (approuter) is a crucial component in XSA applications as it serves as the single point of entry for your application. Without an approuter:

- Users won't be able to authenticate
- Your application won't receive user information
- Direct access to your service endpoints would be possible, bypassing security
- You won't have proper session management

## Add Approuter Support

1. First, run the CAP command to add approuter support:

   cds add approuter

2. The command creates a basic approuter configuration, but we need to adjust it for XSA. Update your `mta.yaml` to include the XSA-specific approuter configuration:

   # ... existing modules ...

   - name: cap-workshop-approuter
     type: nodejs # Important: Must use 'nodejs' for XSA compatibility
     path: app/approuter
     parameters:
     buildpack: sap_nodejs_buildpack
     memory: 256M
     requires:
     - name: cap-workshop-auth
     - name: srv-api
       group: destinations
       properties:
       name: srv-api
       url: ~{srv-url}
       forwardAuthToken: true
       provides:
     - name: app-api
       properties:
       url: ${default-url}

   # ... rest of the file ...

   > ⚠️ **Important**: In XSA environments, you must use `type: nodejs`. The `approuter.nodejs` type is only supported in Cloud Foundry environments. Using `approuter.nodejs` in XSA will cause deployment failures.

3. Modify the `app/approuter/xs-app.json` configuration for XSA:

   {
   "welcomeFile": "index.html",
   "authenticationMethod": "route",
   "routes": [
   {
   "source": "^/service/(.*)$",
   "target": "$1",
   "destination": "srv-api",
   "authenticationType": "xsuaa"
   }
   ]
   }

## Understanding the Approuter

The Application Router serves several important functions:

1. **Authentication**: Handles user login through XSUAA
2. **Request Forwarding**: Routes requests to the appropriate backend services
3. **Security**: Ensures all requests are authenticated before reaching your services
4. **Session Management**: Manages user sessions and tokens

### Key Components:

1. **MTA Configuration**:

   - `nodejs` type indicates it's an XSA approuter
   - Requires the XSUAA service (`cap-workshop-auth`)
   - Connects to the backend service through the `srv-api` destination

2. **Routes Configuration** (`xs-app.json`):
   - `authenticationMethod`: Defines how authentication is handled
   - `routes`: Specifies how URLs are mapped to backend services
   - `authenticationType`: Ensures XSUAA authentication for routes

## Accessing Your Application

After deployment, users will access your application through the approuter URL instead of directly accessing the service endpoints. The flow will be:

1. User accesses approuter URL
2. Approuter redirects to XSUAA login if not authenticated
3. After authentication, requests are forwarded to backend services
4. User information and tokens are properly managed

## Next Steps

With the approuter configured, your application now has a secure entry point. The next step will be to build and deploy your complete application to XSA.

> 💡 **Tip**: Make sure your `xs-security.json` includes appropriate scopes and role templates, as the approuter will enforce these security settings.
