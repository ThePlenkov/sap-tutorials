---
title: "Building Docker Images"
description: "Learn how to create custom Docker images for your applications"
order: 3
---

# Building Docker Images

Let's learn how to create custom Docker images for your applications.

## Dockerfile Basics

A Dockerfile is a text file containing instructions for building a Docker image.

### Basic Structure

```dockerfile
# Use an official base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
```

## Building Images

```bash
# Basic build
docker build -t my-app:1.0 .

# Build with different Dockerfile
docker build -f Dockerfile.prod -t my-app:prod .

# Build with build args
docker build --build-arg ENV=production -t my-app:prod .
```

## Multi-stage Builds

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
```

## Layer Optimization

### 1. Order Dependencies

```dockerfile
# GOOD - Dependencies change less frequently
COPY package*.json ./
RUN npm install
COPY . .

# BAD - Forces npm install on every code change
COPY . .
RUN npm install
```

### 2. Use .dockerignore

```plaintext
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
README.md
```

## Best Practices

1. **Minimize Layers**
   ```dockerfile
   # GOOD
   RUN apt-get update && apt-get install -y \
       package1 \
       package2 \
       && rm -rf /var/lib/apt/lists/*

   # BAD
   RUN apt-get update
   RUN apt-get install package1
   RUN apt-get install package2
   ```

2. **Use Specific Tags**
   ```dockerfile
   # GOOD
   FROM node:18.17.1-slim

   # BAD
   FROM node:latest
   ```

3. **Security Considerations**
   ```dockerfile
   # Create non-root user
   RUN useradd -r -u 1001 -g appuser appuser
   USER appuser
   ```

## Image Management

```bash
# List images
docker images

# Remove image
docker rmi my-app:1.0

# Tag image
docker tag my-app:1.0 registry.example.com/my-app:1.0

# Push image
docker push registry.example.com/my-app:1.0
```

## Next Steps

In the next section, we'll learn how to containerize a Node.js application.