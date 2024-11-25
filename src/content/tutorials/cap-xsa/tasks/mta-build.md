---
title: "Building MTA Application"
description: "Build your Multi-Target Application for XSA deployment"
---

# Building MTA Application

Now that we have our MTA configuration, let's build the application for deployment.

## Install Build Tool

Install MTA build tool as a development dependency:
```bash
npm install -D mbt
```

We recommend using a local dependency instead of a global installation to ensure consistent builds across development and CI/CD environments.

## Build Process

Add the build script to your `package.json`:
```bash
npm pkg set scripts.build="mbt build --platform=xsa --mtar=\${npm_package_name}.mtar"
```

Now you can build the MTA project:
```bash
npm run build
```

This command:
- Creates a `mta_archives` directory
- Packages all modules according to `mta.yaml`
- Generates deployment descriptors
- Creates the final `.mtar` file

> **Note**: The `--platform=xsa` parameter is required for proper XSA deployment.

## Build Output

After successful build, you'll find:
```plaintext
mta_archives/
└── cap-workshop.mtar
```

## Next Steps

Now that we have our MTA archive built, we'll configure our CAP application to use HANA database features.