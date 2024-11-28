---
title: "Setting Up Kubernetes Development Environment"
description: "Configure a local Kubernetes environment for development and testing"
order: 2
---

# Setting Up Kubernetes Development Environment

Let's prepare a local Kubernetes environment for development and testing.

## Prerequisites

- Docker Desktop with Kubernetes enabled
- kubectl CLI tool installed
- helm package manager

## Enable Kubernetes

1. In Docker Desktop:
   - Go to Settings > Kubernetes
   - Check "Enable Kubernetes"
   - Click "Apply & Restart"

## Verify Setup

```bash
kubectl cluster-info
kubectl get nodes
```

## Install Required Tools

1. Install Helm:
   ```bash
   # MacOS
   brew install helm

   # Windows
   choco install kubernetes-helm
   ```

2. Add SAP Registry:
   ```bash
   helm repo add sap-repository https://kubernetes-charts.sap.github.io/
   helm repo update
   ```

## Next Steps

Next, we'll create the necessary Kubernetes resources for our application.