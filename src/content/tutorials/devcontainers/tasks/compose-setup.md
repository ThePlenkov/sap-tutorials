---
title: "Multi-Container Development Environment"
description: "Set up a Development Container with multiple services using Docker Compose"
order: 4
---

# Multi-Container Development Environment

Learn how to create a DevContainer environment with multiple services using Docker Compose.

## Project Setup

1. Create the following structure:
   ```plaintext
   .
   ├── .devcontainer/
   │   ├── devcontainer.json
   │   ├── docker-compose.yml
   │   └── Dockerfile
   ├── src/
   │   └── index.ts
   ├── package.json
   └── tsconfig.json
   ```

2. Create `.devcontainer/docker-compose.yml`:
   ```yaml
   version: '3.8'

   services:
     app:
       build:
         context: ..
         dockerfile: .devcontainer/Dockerfile
       volumes:
         - ..:/workspace:cached
         - node_modules:/workspace/node_modules
       command: sleep infinity
       environment:
         - DATABASE_URL=postgres://postgres:postgres@db:5432/devdb
         - REDIS_URL=redis://cache:6379
       depends_on:
         - db
         - cache

     db:
       image: postgres:15
       restart: unless-stopped
       volumes:
         - postgres-data:/var/lib/postgresql/data
       environment:
         POSTGRES_PASSWORD: postgres
         POSTGRES_DB: devdb

     cache:
       image: redis:7
       restart: unless-stopped
       volumes:
         - redis-data:/data

   volumes:
     postgres-data:
     redis-data:
     node_modules:
   ```

3. Update `.devcontainer/devcontainer.json`:
   ```json
   {
     "name": "Node.js & PostgreSQL & Redis",
     "dockerComposeFile": "docker-compose.yml",
     "service": "app",
     "workspaceFolder": "/workspace",
     
     "customizations": {
       "vscode": {
         "extensions": [
           "dbaeumer.vscode-eslint",
           "esbenp.prettier-vscode",
           "ms-vscode.vscode-typescript-next",
           "mtxr.sqltools",
           "mtxr.sqltools-driver-pg",
           "cweijan.vscode-postgresql-client2"
         ]
       }
     },
     
     "forwardPorts": [3000, 5432, 6379],
     
     "postCreateCommand": "npm install",
     
     "remoteUser": "node",
     
     "features": {
       "ghcr.io/devcontainers/features/git:1": {},
       "ghcr.io/devcontainers/features/github-cli:1": {}
     }
   }
   ```

4. Create `.devcontainer/Dockerfile`:
   ```dockerfile
   FROM mcr.microsoft.com/devcontainers/typescript-node:18

   # Install PostgreSQL client
   RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
       && apt-get -y install --no-install-recommends \
          postgresql-client \
          redis-tools \
       && apt-get clean -y \
       && rm -rf /var/lib/apt/lists/*

   # Install global packages
   RUN su node -c "npm install -g prisma"

   USER node
   ```

5. Update `package.json`:
   ```json
   {
     "name": "fullstack-dev-environment",
     "version": "1.0.0",
     "main": "dist/index.js",
     "scripts": {
       "build": "tsc",
       "start": "node dist/index.js",
       "dev": "ts-node-dev src/index.ts",
       "prisma:generate": "prisma generate",
       "prisma:migrate": "prisma migrate dev"
     },
     "dependencies": {
       "@prisma/client": "^5.0.0",
       "express": "^4.18.2",
       "redis": "^4.6.7"
     },
     "devDependencies": {
       "@types/express": "^4.17.17",
       "@types/node": "^18.17.1",
       "prisma": "^5.0.0",
       "ts-node-dev": "^2.0.0",
       "typescript": "^5.1.6"
     }
   }
   ```

6. Create `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Post {
     id        Int      @id @default(autoincrement())
     title     String
     content   String?
     published Boolean  @default(false)
     createdAt DateTime @default(now())
   }
   ```

7. Create `src/index.ts`:
   ```typescript
   import express from 'express';
   import { PrismaClient } from '@prisma/client';
   import { createClient } from 'redis';

   const app = express();
   const prisma = new PrismaClient();
   const redis = createClient({
     url: process.env.REDIS_URL
   });

   app.use(express.json());

   // Connect to Redis
   redis.connect().catch(console.error);

   // Create a post
   app.post('/posts', async (req, res) => {
     const { title, content } = req.body;
     const post = await prisma.post.create({
       data: { title, content }
     });
     await redis.set(`post:${post.id}`, JSON.stringify(post));
     res.json(post);
   });

   // Get a post (with Redis caching)
   app.get('/posts/:id', async (req, res) => {
     const id = parseInt(req.params.id);
     
     // Try cache first
     const cached = await redis.get(`post:${id}`);
     if (cached) {
       return res.json(JSON.parse(cached));
     }
     
     // If not in cache, get from database
     const post = await prisma.post.findUnique({
       where: { id }
     });
     
     if (post) {
       await redis.set(`post:${id}`, JSON.stringify(post));
       res.json(post);
     } else {
       res.status(404).json({ error: 'Post not found' });
     }
   });

   const port = process.env.PORT || 3000;
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

## Using the Environment

1. Start the DevContainer in VS Code

2. Initialize the database:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Test the API:
   ```bash
   # Create a post
   curl -X POST http://localhost:3000/posts \
     -H "Content-Type: application/json" \
     -d '{"title":"Hello","content":"World"}'

   # Get a post
   curl http://localhost:3000/posts/1
   ```

## Development Features

1. **Database Management**
   - PostgreSQL with persistent storage
   - Prisma ORM for type-safe queries
   - Database GUI tools in VS Code

2. **Caching Layer**
   - Redis for high-speed caching
   - Persistent Redis storage
   - Redis CLI tools included

3. **Development Tools**
   - Hot reloading
   - TypeScript support
   - Database management extensions
   - Git integration

## Best Practices

1. **Data Persistence**
   - Use named volumes for databases
   - Implement proper backup strategies
   - Handle data migrations

2. **Performance**
   - Configure volume mounts correctly
   - Use appropriate caching strategies
   - Optimize container resources

3. **Security**
   - Use environment variables for secrets
   - Implement proper access controls
   - Regular security updates

## Congratulations!

You've completed the DevContainers tutorial! You now know how to:
- Set up basic DevContainers
- Create custom Dockerfile configurations
- Implement multi-container development environments
- Use databases and caching in your development setup