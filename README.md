# k8s-demo-guestbook (kubeadm-ready)

This is a minimal **full-stack demo** (React frontend + Flask backend + MySQL) prepared for **kubeadm / bare-metal / minikube** demos.
Frontend and backend are exposed as **NodePort** services so you can access them from outside the cluster.

**Default Node IP placeholder:** `<NODE_IP>` — replace this with your node/public IP (for example: 184.72.213.3)

## Ports (preconfigured)
- Frontend NodePort: **30080**  (serves the React build on port 80)
- Backend NodePort: **30050**   (serves Flask on port 5000)
- MySQL: ClusterIP (3306) — internal

## Quick steps (kubeadm or minikube)
1. Build Docker images and push to a registry accessible by your cluster (or build on-node):
   - `backend` image: `misbah/backend:latest`
   - `frontend` image: `misbah/frontend:latest`
   OR if using `kind`/`minikube` you can build images inside the cluster nodes.

2. Apply manifests:
   ```bash
   kubectl apply -f manifests/secrets.yaml
   kubectl apply -f manifests/pvc.yaml
   kubectl apply -f manifests/mysql-deployment.yaml
   kubectl apply -f manifests/backend-deployment.yaml
   kubectl apply -f manifests/frontend-deployment.yaml
   ```

3. Wait for pods to be Ready:
   ```bash
   kubectl get pods -w
   ```

4. From outside the cluster, open:
   - Frontend: http://<NODE_IP>:30080
   - Backend (optional direct): http://<NODE_IP>:30050

> Replace `<NODE_IP>` with your node's IP (e.g., 184.72.213.3). If you're using minikube, run `minikube ip`.

## Notes
- The frontend by default calls the backend at `http://<NODE_IP>:30050`.
- If you prefer Ingress (NGINX controller) and DNS, edit `manifests/frontend-deployment.yaml` and `manifests/backend-deployment.yaml` and expose services as ClusterIP + configure ingress.

Enjoy — open an issue or message me if you want the project adapted for EKS/GKE.
