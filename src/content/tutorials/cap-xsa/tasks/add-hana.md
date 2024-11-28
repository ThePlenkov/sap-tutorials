---
title: "Add HANA Configuration"
description: "Configure your CAP project for SAP HANA deployment"
---

# Add HANA Configuration

Let's configure our CAP project to work with SAP HANA database.

## Add HANA Support

1. Run the following command to add HANA support:
   ```bash
   cds add hana
   ```

This command will:
1. Add HANA database configuration to your project
2. Create HDI deployer configuration files
3. Update project dependencies

> ⚠️ **Important**: If you've previously modified `mta.yaml` manually (for example, changing XSUAA configuration for XSA), the `cds add hana` command might duplicate some resources in the file. This happens because the CLI doesn't recognize existing resources that were manually modified. After running the command, check your `mta.yaml` file and remove any duplicate entries (like multiple `cap-workshop-auth` or `cap-workshop-db` resources) to ensure successful deployment.

## Understanding the Changes

### 1. HDI Configuration

The command creates `.hdiconfig` in `db/src/` directory which defines file suffixes and their corresponding HDI plugins. This is essential for HANA deployment as it tells HDI how to handle different file types.

### 2. Undeploy Configuration

A new `db/undeploy.json` file is created to specify which artifacts should be removed during undeployment:

```json
[
  "src/gen/**/*.hdbview",
  "src/gen/**/*.hdbindex",
  "src/gen/**/*.hdbconstraint",
  "src/gen/**/*_drafts.hdbtable",
  "src/gen/**/*.hdbcalculationview"
]
```

### 3. Package Dependencies

The command updates `package.json` to include HANA-specific dependencies and configuration:

```json
{
  "dependencies": {
    "@cap-js/hana": "^1"
  },
  "cds": {
    "requires": {
      "db": {
        "kind": "hana"
      }
    }
  }
}
```

## Best Practices

1. Always use HDI containers for HANA deployment
2. Follow HANA naming conventions
3. Use appropriate HANA artifacts for different scenarios
4. Implement proper versioning for database objects

## Next Steps

Now that we have configured our project for HANA deployment, we can proceed with building the MTA archive.