---
title: "DevContainers CLI"
description: "Learn how to use the DevContainers CLI for automation and CI/CD"
order: 5
---

# DevContainers CLI

Learn how to use the DevContainers CLI for automation, testing, and CI/CD integration.

## Installing the CLI

1. Install via npm:
   ```bash
   npm install -g @devcontainers/cli
   ```

2. Verify installation:
   ```bash
   devcontainer --version
   ```

## Basic Commands

### 1. Building DevContainers

```bash
# Build from current directory
devcontainer build .

# Build specific path
devcontainer build /path/to/project

# Build with different config
devcontainer build --workspace-folder . --config .devcontainer/custom.json
```

### 2. Running Commands

```bash
# Run command in container
devcontainer exec --workspace-folder . npm test

# Run interactive shell
devcontainer exec --workspace-folder . --interactive bash
```

### 3. Up and Down

```bash
# Start container
devcontainer up .

# Stop container
devcontainer down .
```

## CI/CD Integration

1. **GitHub Actions Example**:
   ```yaml
   name: DevContainer CI

   on: [push]

   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Install DevContainer CLI
           run: npm install -g @devcontainers/cli
           
         - name: Build DevContainer
           run: devcontainer build .
           
         - name: Run Tests
           run: |
             devcontainer exec --workspace-folder . npm install
             devcontainer exec --workspace-folder . npm test
   ```

2. **GitLab CI Example**:
   ```yaml
   image: node:18

   stages:
     - test

   test:
     stage: test
     before_script:
       - npm install -g @devcontainers/cli
     script:
       - devcontainer build .
       - devcontainer exec --workspace-folder . npm install
       - devcontainer exec --workspace-folder . npm test
   ```

## Advanced Usage

### 1. Custom Features

```bash
# List available features
devcontainer features list

# Add feature to container
devcontainer features install ghcr.io/devcontainers/features/docker-in-docker
```

### 2. Configuration Validation

```bash
# Validate devcontainer.json
devcontainer read-configuration .

# Check effective configuration
devcontainer read-configuration . --include-merged-configuration
```

### 3. Pre-building Images

```bash
# Build and publish to registry
devcontainer build . \
  --image-name myregistry.azurecr.io/devcontainer:latest \
  --push
```

## Automation Scripts

1. **Development Environment Setup**:
   ```bash
   #!/bin/bash
   
   # Setup script for new developers
   devcontainer up .
   devcontainer exec --workspace-folder . npm install
   devcontainer exec --workspace-folder . npm run db:setup
   devcontainer exec --workspace-folder . npm run seed
   ```

2. **Test Runner**:
   ```bash
   #!/bin/bash
   
   # Run tests in fresh container
   devcontainer build .
   devcontainer exec --workspace-folder . npm install
   devcontainer exec --workspace-folder . npm test
   devcontainer down .
   ```

## Best Practices

1. **Version Control**
   - Include CLI version in CI configs
   - Lock feature versions
   - Document required CLI version

2. **Performance**
   - Use build caching
   - Pre-build images for CI
   - Optimize container specs

3. **Security**
   - Validate configurations
   - Use trusted features
   - Implement access controls

## Common Use Cases

1. **Automated Testing**
   ```bash
   # Run test suite
   devcontainer build . && \
   devcontainer exec --workspace-folder . npm test && \
   devcontainer down .
   ```

2. **Environment Validation**
   ```bash
   # Verify development setup
   devcontainer read-configuration . && \
   devcontainer up . && \
   devcontainer exec --workspace-folder . ./scripts/verify-env.sh
   ```

3. **Batch Operations**
   ```bash
   # Update multiple containers
   for dir in ./projects/*/; do
     devcontainer build "$dir"
     devcontainer exec --workspace-folder "$dir" npm update
   done
   ```

## Troubleshooting

1. **Common Issues**
   - Path resolution problems
   - Network connectivity
   - Resource constraints

2. **Debug Mode**
   ```bash
   # Enable debug logging
   export DEVCONTAINER_LOG_LEVEL=debug
   devcontainer up .
   ```

3. **Health Checks**
   ```bash
   # Verify container health
   devcontainer exec --workspace-folder . ps aux
   devcontainer exec --workspace-folder . df -h
   ```

## Next Steps

Congratulations! You've completed the DevContainers tutorial series. You now have a comprehensive understanding of:
- DevContainer basics and setup
- Custom configurations
- Multi-container environments
- CLI automation and integration

Consider exploring:
- Advanced CI/CD pipelines
- Custom DevContainer features
- Container orchestration
- Development workflow optimization