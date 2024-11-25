---
title: "Creating a Simple DevContainer"
description: "Set up your first Development Container configuration"
order: 2
---

# Creating a Simple DevContainer

Let's create a basic DevContainer configuration for a Node.js project.

## Project Setup

1. Create a new project directory:
   ```bash
   mkdir my-devcontainer-demo
   cd my-devcontainer-demo
   ```

2. Create the DevContainer configuration directory:
   ```bash
   mkdir .devcontainer
   ```

## Basic Configuration

1. Create `.devcontainer/devcontainer.json`:
   ```json
   {
     "name": "Node.js Development",
     "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
     
     "customizations": {
       "vscode": {
         "extensions": [
           "dbaeumer.vscode-eslint",
           "esbenp.prettier-vscode"
         ],
         "settings": {
           "editor.formatOnSave": true,
           "editor.defaultFormatter": "esbenp.prettier-vscode"
         }
       }
     },
     
     "forwardPorts": [3000],
     
     "postCreateCommand": "npm install",
     
     "remoteUser": "node"
   }
   ```

2. Create a sample Node.js application:

   Create `package.json`:
   ```json
   {
     "name": "devcontainer-demo",
     "version": "1.0.0",
     "main": "index.js",
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
     },
     "dependencies": {
       "express": "^4.18.2"
     },
     "devDependencies": {
       "nodemon": "^3.0.1"
     }
   }
   ```

   Create `index.js`:
   ```javascript
   const express = require('express');
   const app = express();
   const port = 3000;

   app.get('/', (req, res) => {
     res.json({ message: 'Hello from DevContainer!' });
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

## Understanding the Configuration

1. **Base Image**
   - Uses official Microsoft Node.js image
   - Includes common development tools
   - Pre-configured user setup

2. **VS Code Extensions**
   - ESLint for linting
   - Prettier for formatting
   - Automatically installed in container

3. **Port Forwarding**
   - Exposes port 3000 to host
   - Accessible via localhost

4. **Post-Create Command**
   - Runs after container creation
   - Installs project dependencies

## Using the DevContainer

1. Open in VS Code:
   ```bash
   code .
   ```

2. When prompted, click "Reopen in Container" or:
   - Press F1
   - Select "Dev Containers: Reopen in Container"

3. Wait for the container to build and start

4. Start the application:
   ```bash
   npm run dev
   ```

## Customizing Settings

1. **Adding More Extensions**
   ```json
   "customizations": {
     "vscode": {
       "extensions": [
         "dbaeumer.vscode-eslint",
         "esbenp.prettier-vscode",
         "christian-kohler.npm-intellisense",
         "streetsidesoftware.code-spell-checker"
       ]
     }
   }
   ```

2. **Environment Variables**
   ```json
   "remoteEnv": {
     "NODE_ENV": "development"
   }
   ```

3. **Mount Points**
   ```json
   "mounts": [
     "source=${localEnv:HOME}/.ssh,target=/home/node/.ssh,type=bind,readonly"
   ]
   ```

## Next Steps

In the next section, we'll learn how to create a custom Dockerfile for more specific development requirements.