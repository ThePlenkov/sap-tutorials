---
title: "Custom Dockerfile for DevContainers"
description: "Create a custom Dockerfile for your Development Container"
order: 3
---

# Custom Dockerfile for DevContainers

Learn how to create and use a custom Dockerfile with your DevContainer configuration.

## Creating a Custom Dockerfile

1. Create `.devcontainer/Dockerfile`:
   ```dockerfile
   FROM mcr.microsoft.com/devcontainers/javascript-node:18

   # Install additional OS packages
   RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
       && apt-get -y install --no-install-recommends \
          postgresql-client \
          redis-tools \
       && apt-get clean -y \
       && rm -rf /var/lib/apt/lists/*

   # Install global npm packages
   RUN su node -c "npm install -g typescript ts-node"

   # Install Oh My Zsh for better terminal experience
   RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended \
       && chsh -s $(which zsh) node

   # Copy custom VS Code settings
   COPY .vscode/settings.json /home/node/.vscode-server/data/Machine/settings.json

   # Switch to non-root user
   USER node
   ```

2. Update `.devcontainer/devcontainer.json`:
   ```json
   {
     "name": "Custom Node.js Environment",
     "build": {
       "dockerfile": "Dockerfile",
       "context": ".."
     },
     
     "customizations": {
       "vscode": {
         "extensions": [
           "dbaeumer.vscode-eslint",
           "esbenp.prettier-vscode",
           "ms-vscode.vscode-typescript-next"
         ]
       }
     },
     
     "forwardPorts": [3000],
     
     "postCreateCommand": "npm install",
     
     "remoteUser": "node",
     
     "features": {
       "ghcr.io/devcontainers/features/git:1": {},
       "ghcr.io/devcontainers/features/github-cli:1": {}
     }
   }
   ```

## Project Setup

1. Create `.vscode/settings.json`:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "typescript.updateImportsOnFileMove.enabled": "always",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

2. Create a TypeScript project:

   Update `package.json`:
   ```json
   {
     "name": "devcontainer-typescript",
     "version": "1.0.0",
     "main": "dist/index.js",
     "scripts": {
       "build": "tsc",
       "start": "node dist/index.js",
       "dev": "ts-node-dev src/index.ts"
     },
     "dependencies": {
       "express": "^4.18.2"
     },
     "devDependencies": {
       "@types/express": "^4.17.17",
       "@types/node": "^18.17.1",
       "ts-node-dev": "^2.0.0",
       "typescript": "^5.1.6"
     }
   }
   ```

3. Create `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./src",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules"]
   }
   ```

4. Create `src/index.ts`:
   ```typescript
   import express from 'express';

   const app = express();
   const port = process.env.PORT || 3000;

   interface Message {
     text: string;
     timestamp: Date;
   }

   app.get('/', (_req, res) => {
     const message: Message = {
       text: 'Hello from TypeScript DevContainer!',
       timestamp: new Date()
     };
     res.json(message);
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

## Understanding Custom Setup

1. **Base Image Selection**
   - Uses Microsoft's Node.js image
   - Includes development tools
   - Non-root user setup

2. **Additional Tools**
   - PostgreSQL client
   - Redis tools
   - TypeScript globally installed
   - Oh My Zsh for better terminal

3. **VS Code Configuration**
   - TypeScript extensions
   - ESLint and Prettier
   - Custom settings

## Best Practices

1. **Layer Optimization**
   - Combine RUN commands
   - Clean up package manager cache
   - Use .dockerignore

2. **Security**
   - Run as non-root user
   - Keep base images updated
   - Minimize installed packages

3. **Development Experience**
   - Include useful CLI tools
   - Configure shell environment
   - Set up debugging

## Next Steps

In the final section, we'll learn how to set up a multi-container development environment using Docker Compose.