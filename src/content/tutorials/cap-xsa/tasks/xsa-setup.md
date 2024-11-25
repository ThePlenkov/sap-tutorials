---
title: "Setting up XSA Development Environment"
description: "Configure your development environment for CAP on XSA"
---

# Setting up XSA Development Environment

Let's prepare your development environment for building CAP applications that will run on XSA.

## Prerequisites

1. Node.js LTS version (installed from SAP CAP Basics tutorial)
2. SAP HANA XSA environment access
3. Visual Studio Code with [SAP CDS Language Support](https://marketplace.visualstudio.com/items?itemName=SAPSE.vscode-cds) extension
4. For Windows users: [Windows Subsystem for Linux (WSL2)](https://learn.microsoft.com/en-us/windows/wsl/#get-started) is highly recommended for development

## XS CLI Setup

The XS CLI client is available through SAP Note [2242468](https://me.sap.com/notes/2242468). Follow these steps:

1. Download the appropriate XS CLI package for your operating system from the SAP Note
2. Extract the archive to a local directory
3. Add the directory to your system PATH

Verify the installation:
```bash
xs help
```

## XSA Connection Setup

Configure your XSA connection:
```bash
xs api https://your-xsa-host:30030 --skip-ssl-validation
xs login
```

## Configure VS Code

Install and configure required VS Code extensions:
- SAP HANA Database Explorer
- SAP HANA Tools

## Verify Setup

Test your XSA connection:
```bash
xs target
xs orgs
xs spaces
```

## Next Steps

Now that your environment is ready, we'll configure a CAP project for XSA deployment.