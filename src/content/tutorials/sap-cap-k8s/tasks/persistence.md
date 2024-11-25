---
title: "Configuring Database Persistence"
description: "Set up persistent storage for your CAP application's database in Kubernetes"
order: 4
---

# Configuring Database Persistence

Let's set up persistent storage for our CAP application's database.

## Create PersistentVolume

1. Create `k8s/persistence.yaml`:
   ```yaml
   apiVersion: v1
   kind: PersistentVolume
   metadata:
     name: cap-db-pv
   spec:
     capacity:
       storage: 1Gi
     accessModes:
       - ReadWriteOnce
     hostPath:
       path: "/data/cap-db"
   ```

## PersistentVolumeClaim

1. Add to `k8s/persistence.yaml`:
   ```yaml
   ---
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: cap-db-pvc
     namespace: cap-app
   spec:
     accessModes:
       - ReadWriteOnce
     resources:
       requests:
         storage: 1Gi
   ```

## Update Deployment

1. Modify `k8s/deployment.yaml` to include volume:
   ```yaml
   spec:
     template:
       spec:
         volumes:
         - name: db-storage
           persistentVolumeClaim:
             claimName: cap-db-pvc
         containers:
         - name: cap-app
           volumeMounts:
           - name: db-storage
             mountPath: /app/db/data
   ```

## Apply Changes

```bash
kubectl apply -f k8s/persistence.yaml
kubectl apply -f k8s/deployment.yaml
```

## Next Steps

Finally, we'll set up monitoring and configure health checks.