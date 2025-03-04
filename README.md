# Smart Home Energy Monitoring - CI/CD Pipeline & Kubernetes Deployment

## 📌 Project Overview

This project is a **Smart Home Energy Monitoring** application with a **React frontend**, **Node.js backend**, and **MySQL database**. The application is deployed using **Docker** and **Kubernetes**, with a CI/CD pipeline managed by **Jenkins**.

## ⚙️ Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Kubernetes (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Jenkins](https://www.jenkins.io/download/)
- [Ngrok (Optional)](https://ngrok.com/download)

## 🚀 Setup & Installation

### 1⃣ Clone the Repository

```bash
git clone git@github.com:vnk123/Smart-home-Energy-Monitoring-.git
cd Smart-home-Energy-Monitoring-
```

### 2⃣ Setup Jenkins

1. Install **Docker Pipeline** and **Kubernetes CLI** plugins in Jenkins.
2. Add the following Jenkins credentials:
   - `` → DockerHub username & password.
   - `` → Kubeconfig file for cluster access.
   - `` → SSH key for GitHub.
3. Create a **Jenkins Pipeline Job** and use the provided `Jenkinsfile`.

### 3⃣ Run the Jenkins Pipeline

1. Trigger the Jenkins job.
2. It will:
   - Checkout code from GitHub.
   - Build and test **frontend** & **backend**.
   - Build Docker images and push them to **DockerHub**.
   - Deploy the app to **Kubernetes**.

## 🐳 Docker Setup

### Build & Push Docker Images

```bash
docker build -t <DOCKERHUB_USERNAME>/frontend:latest ./frontend
docker build -t <DOCKERHUB_USERNAME>/backend:latest ./backend
docker login -u "<DOCKERHUB_USERNAME>" -p "<DOCKERHUB_PASSWORD>"
docker push <DOCKERHUB_USERNAME>/frontend:latest
docker push <DOCKERHUB_USERNAME>/backend:latest
```

## ☨️ Kubernetes Deployment

### Apply Deployments & Services

```bash
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/mysql-deployment.yaml
```

### Verify Pods & Services

```bash
kubectl get pods
kubectl get svc
```

If **frontend-service** is of type **LoadBalancer**, access it using:

```
http://<EXTERNAL-IP>
```

## 🎥 Project Video Demo

Watch the project demo here: [Smart Home Energy Monitoring - Demo](https://drive.google.com/file/d/1koisaUUDIMjISkXE1sPU8dzgtXag6e9J/view?usp=drive_link)

