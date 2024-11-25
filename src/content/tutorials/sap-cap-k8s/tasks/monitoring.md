---
title: "Monitoring and Health Checks"
description: "Implement monitoring and health checks for your CAP application in Kubernetes"
order: 5
---

# Monitoring and Health Checks

Let's add monitoring and health checks to ensure our application runs reliably.

## Add Health Endpoints

1. Create `srv/health.js`:
   ```javascript
   const cds = require('@sap/cds');

   module.exports = async (srv) => {
     srv.on('GET', '/health/live', async (req) => {
       return { status: 'UP' };
     });

     srv.on('GET', '/health/ready', async (req) => {
       try {
         await cds.connect.to('db');
         return { status: 'UP' };
       } catch (err) {
         req.reject(500, { status: 'DOWN', error: err.message });
       }
     });
   };
   ```

## Update Kubernetes Deployment

1. Add health checks to `k8s/deployment.yaml`:
   ```yaml
   spec:
     template:
       spec:
         containers:
         - name: cap-app
           livenessProbe:
             httpGet:
               path: /health/live
               port: 4004
             initialDelaySeconds: 30
             periodSeconds: 30
           readinessProbe:
             httpGet:
               path: /health/ready
               port: 4004
             initialDelaySeconds: 10
             periodSeconds: 10
   ```

## Set Up Prometheus Monitoring

1. Install Prometheus Operator:
   ```bash
   helm install prometheus prometheus-community/kube-prometheus-stack \
     --namespace monitoring \
     --create-namespace
   ```

2. Create ServiceMonitor:
   ```yaml
   apiVersion: monitoring.coreos.com/v1
   kind: ServiceMonitor
   metadata:
     name: cap-app
     namespace: monitoring
   spec:
     selector:
       matchLabels:
         app: cap-app
     endpoints:
     - port: http
       path: /metrics
   ```

## Next Steps

Congratulations! You've completed the Kubernetes deployment tutorial. Your CAP application is now running in a production-ready Kubernetes environment with proper monitoring and health checks.