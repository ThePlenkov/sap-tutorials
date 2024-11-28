---
title: "Containerizing Your CAP Application"
description: "Learn how to containerize your SAP CAP application using Docker"
order: 1
---

# Containerizing Your CAP Application

First, we'll prepare your CAP application for containerization using Docker.

## Prerequisites

- Docker Desktop installed and running
- CAP application from the basics tutorial
- Basic understanding of containers

## Creating the Dockerfile

1. Create a `Dockerfile` in your project root:
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
   COPY --from=builder /app/package*.json ./
   COPY --from=builder /app/gen ./gen
   COPY --from=builder /app/db ./db
   RUN npm install --production
   EXPOSE 4004
   CMD ["npm", "start"]
   ```

## Building the Container

Build your Docker image:
```bash
docker build -t cap-app:1.0.0 .
```

## Testing Locally

Run the container locally:
```bash
docker run -p 4004:4004 cap-app:1.0.0
```

## Next Steps

In the next task, we'll set up a local Kubernetes cluster for development.