---
title: "Containerizing Node.js Applications"
description: "Learn how to containerize a Node.js application with Docker"
order: 4
---

# Containerizing Node.js Applications

Let's create a practical example by containerizing a Node.js application.

## Sample Application

### 1. Project Structure
```plaintext
my-node-app/
├── src/
│   └── index.js
├── package.json
├── Dockerfile
└── .dockerignore
```

### 2. Application Code

```javascript
// src/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### 3. Package.json

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## Dockerfile

### Development Version

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### Production Version

```dockerfile
# Build stage
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Production stage
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

RUN npm install --production

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

## Docker Compose for Development

```yaml
version: '3.8'

services:
  app:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
      - ./package.json:/app/package.json
    environment:
      - NODE_ENV=development
```

## Building and Running

```bash
# Build development image
docker build -t node-app:dev .

# Run development container
docker run -p 3000:3000 -v $(pwd)/src:/app/src node-app:dev

# Build production image
docker build -f Dockerfile.prod -t node-app:prod .

# Run production container
docker run -p 3000:3000 node-app:prod
```

## Best Practices

1. **Environment Variables**
   ```dockerfile
   ENV NODE_ENV=production
   ENV PORT=3000
   ```

2. **Health Checks**
   ```dockerfile
   HEALTHCHECK --interval=30s --timeout=3s \
     CMD curl -f http://localhost:3000/health || exit 1
   ```

3. **Proper Signal Handling**
   ```javascript
   process.on('SIGTERM', () => {
     console.log('Received SIGTERM. Performing cleanup...');
     process.exit(0);
   });
   ```

## Next Steps

In the final section, we'll learn about Docker Compose for managing multi-container applications.