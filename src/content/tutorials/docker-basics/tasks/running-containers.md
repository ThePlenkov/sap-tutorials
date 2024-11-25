---
title: "Running Docker Containers"
description: "Learn how to run and manage Docker containers"
order: 2
---

# Running Docker Containers

Let's learn how to run and manage Docker containers effectively.

## Basic Container Operations

### 1. Running Containers

```bash
# Run a container
docker run nginx

# Run in detached mode
docker run -d nginx

# Run with port mapping
docker run -d -p 8080:80 nginx

# Run with a name
docker run -d --name my-nginx nginx
```

### 2. Container Management

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop my-nginx

# Start a container
docker start my-nginx

# Remove a container
docker rm my-nginx
```

## Working with Container Logs

```bash
# View container logs
docker logs my-nginx

# Follow log output
docker logs -f my-nginx

# Show last n lines
docker logs --tail 100 my-nginx
```

## Container Shell Access

```bash
# Access container shell
docker exec -it my-nginx bash

# Run a single command
docker exec my-nginx ls /etc/nginx
```

## Environment Variables

```bash
# Set environment variables
docker run -d \
  -e DB_HOST=localhost \
  -e DB_PORT=5432 \
  my-app
```

## Volume Mounting

```bash
# Mount a host directory
docker run -d \
  -v $(pwd)/html:/usr/share/nginx/html \
  -p 8080:80 \
  nginx
```

## Network Configuration

```bash
# Create a network
docker network create my-network

# Run container in network
docker run -d \
  --network my-network \
  --name db \
  postgres
```

## Resource Limits

```bash
# Set memory limit
docker run -d \
  --memory="512m" \
  --cpus="1.0" \
  nginx
```

## Best Practices

1. Always use meaningful container names
2. Clean up unused containers
3. Use resource limits in production
4. Monitor container logs
5. Use proper networking

## Practical Exercise

Let's run a web server:

1. Start Nginx:
   ```bash
   docker run -d \
     --name web-server \
     -p 8080:80 \
     nginx
   ```

2. Check it's running:
   ```bash
   docker ps
   curl http://localhost:8080
   ```

3. View logs:
   ```bash
   docker logs web-server
   ```

4. Stop and clean up:
   ```bash
   docker stop web-server
   docker rm web-server
   ```

## Next Steps

In the next section, we'll learn how to build custom Docker images.