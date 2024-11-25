---
title: "Setting up your CAP development environment"
description: "Install and configure the necessary tools for SAP CAP development"
---

# Setting up your CAP development environment

Before we start developing with SAP CAP, we need to set up our development environment.

## Prerequisites

- Basic knowledge of JavaScript/Node.js
- Understanding of REST APIs
- Familiarity with SQL databases

## Steps

1. Install Node.js (LTS version)
2. Install the CAP CLI globally:
   ```bash
   npm install -g @sap/cds-dk
   ```
3. Verify the installation:
   ```bash
   cds --version
   ```

## Troubleshooting

If you encounter any issues:
- Ensure Node.js is properly installed
- Check system PATH variables
- Try running commands with administrator privileges

## Next Steps

Once you've completed the setup, we'll create our first CAP project.