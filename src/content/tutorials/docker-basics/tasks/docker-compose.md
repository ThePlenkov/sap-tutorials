---
title: "Docker Compose"
description: "Managing multi-container applications with Docker Compose"
order: 5
---

# Docker Compose

Learn how to manage multi-container applications using Docker Compose.

## Docker Compose Basics

Docker Compose is a tool for defining and running multi-container Docker applications.

### Basic Structure

```yaml
version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_PORT=5432

  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

volumes:
  postgres_data:
```

## Common Use Cases

### 1. Web Application with Database

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://db:27017/myapp
    depends_on:
      - db

  db:
    image: mongo:4.4
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

### 2. Development Environment

```yaml
version: '3.8'

services:
  app:
    build: 
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    command: npm run dev

  test:
    build: 
      context: .
      target: test
    volumes:
      - .:/app
      - /app/node_modules
    command: npm test
```

## Basic Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Build images
docker-compose build

# List containers
docker-compose ps
```

## Advanced Features

### 1. Dependencies and Health Checks

```yaml
services:
  web:
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 2. Networks

```yaml
services:
  frontend:
    networks:
      - frontend-network
  
  backend:
    networks:
      - frontend-network
      - backend-network
  
  db:
    networks:
      - backend-network

networks:
  frontend-network:
  backend-network:
```

## Best Practices

1. **Environment Variables**
   ```yaml
   services:
     web:
       env_file:
         - .env.development
   ```

2. **Volume Management**
   ```yaml
   services:
     app:
       volumes:
         - .:/app:ro  # Read-only mount
         - node_modules:/app/node_modules
   
   volumes:
     node_modules:
   ```

3. **Resource Limits**
   ```yaml
   services:
     app:
       deploy:
         resources:
           limits:
             cpus: '0.50'
             memory: 512M
   ```

## Production Considerations

1. **Security**
   - Use secrets management
   - Limit exposed ports
   - Use non-root users

2. **Performance**
   - Configure resource limits
   - Use volume bindings carefully
   - Optimize build context

3. **Monitoring**
   - Implement health checks
   - Configure logging
   - Set up metrics collection

## Congratulations!

You've completed the Docker basics tutorial! You now have a solid foundation in:
- Docker fundamentals
- Container management
- Image building
- Node.js containerization
- Multi-container orchestration with Docker Compose