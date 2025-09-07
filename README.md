# Guestbook App on Kubernetes (kubeadm)

A full-stack Guestbook application, deployed on a self-managed Kubernetes cluster (kubeadm). It includes:

- **Frontend**: React + Vite, served via Nginx with API proxying.
- **Backend**: Flask REST APIs (`/signup`, `/signin`, `/health`).
- **Database**: MySQL.
- **Infrastructure**: Kubernetes on Ubuntu (kubeadm), Docker images hosted on DockerHub.

---

##  Project Structure

```
kubedeam/
 ├── backend/
 ├── frontend/
 ├── mysql/
 └── k8s/
```

---

##  Docker Images on DockerHub

- Backend: **ahmadali616/backend:latest**  
- Frontend (with API proxy): **ahmadali616/frontend-proxy:latest**

---

##  How to Use

### 1. Kubeadm Cluster Setup  
Follow the **Kubeadm Installation Guide** section below to set up a Kubernetes cluster using kubeadm.

### 2. Deploy Services  
```bash
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

Verify status:
```bash
kubectl get pods
kubectl get svc
```

### 3. Access the App  
Open your browser at:
```
http://<NODE_IP>:30080
```
- Use signup/signin in-browser.  
- Alerts like "User registered successfully" or "Login successful" will appear.

---

##  Backend APIs

```bash
# Signup
curl -X POST http://<NODE_IP>:30050/signup   -H "Content-Type: application/json"   -d '{"username":"test","password":"123"}'

# Signin
curl -X POST http://<NODE_IP>:30050/signin   -H "Content-Type: application/json"   -d '{"username":"test","password":"123"}'

# Health Check
curl http://<NODE_IP>:30050/health
```

---

##  Kubeadm Installation Guide

### Prerequisites:
- Ubuntu 20.04+  
- `sudo` access  
- AWS EC2 host for nodes  

### Common Setup (Master & Worker)
```bash
# Install kubectl
curl -LO "https://dl.k8s.io/.../kubectl"
sudo install kubectl /usr/local/bin/

# Disable swap
sudo swapoff -a

# Enable required kernel modules
sudo tee /etc/modules-load.d/k8s.conf <<EOF
overlay
br_netfilter
EOF
sudo modprobe overlay br_netfilter

# Enable sysctl params
sudo tee /etc/sysctl.d/k8s.conf <<EOF
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
sudo sysctl --system

# Install CRI-O
# … [commands from your guide here] …
```

### Master Node Only
```bash
sudo kubeadm config images pull
sudo kubeadm init
mkdir -p $HOME/.kube && sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config
kubectl apply -f https://.../calico.yaml
kubectl token create --print-join-command
```

### Worker Node Only
```bash
sudo kubeadm reset
sudo kubeadm join <master-ip>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

### Validate
```bash
kubectl get nodes
```
Look for both master and worker in `Ready` state.

---

##  Future Enhancements
- Use Ingress instead of NodePort  
- Add persistent storage to MySQL  
- Set up CI/CD (GitHub Actions)

---

## Architecture Diagram

<img width="889" height="583" alt="image" src="https://github.com/user-attachments/assets/299ea55b-7826-471e-be71-0f23cf5035ae" />


---


##  Author

**Misbah Ashiq**  

- DockerHub: [ahmadali616](https://hub.docker.com/repositories/ahmadali616)  
- GitHub: [Misbah-Ashiq](https://github.com/Misbah-Ashiq/Kubernetes-Full-Stack-Project-on-kubeadm.git)
- Linkedin: [Misbah Ashiq](www.linkedin.com/in/misbah-ashiq-14a0aa356)
- UpWork: [Misbah Ashiq](https://www.upwork.com/freelancers/~0174d196bc738ae9ea)
