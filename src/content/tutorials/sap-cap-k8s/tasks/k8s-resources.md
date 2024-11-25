---
title: "Creating Kubernetes Resources"
description: "Set up the necessary Kubernetes resources for deploying your CAP application"
order: 3
---

# Creating Kubernetes Resources

Now we'll create the necessary Kubernetes resources to run our CAP application.

## Create Namespace

1. Create `k8s/namespace.yaml`:
   ```yaml
   apiVersion: v1
   kind: Namespace
   metadata:
     name: cap-app
   ```

## Deployment Configuration

1. Create `k8s/deployment.yaml`:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: cap-app
     namespace: cap-app
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: cap-app
     template:
       metadata:
         labels:
           app: cap-app
       spec:
         containers:
         - name: cap-app
           image: cap-app:1.0.0
           ports:
           - containerPort: 4004
           env:
           - name: NODE_ENV
             value: "production"
   ```

## Service Configuration

1. Create `k8s/service.yaml`:
   ```yaml
   apiVersion: v1
   kind: Service
   metadata:
     name: cap-app
     namespace: cap-app
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 4004
     selector:
       app: cap-app
   ```

## Apply Resources

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## Next Steps

In the next section, we'll configure persistence for our application.