pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        KUBECONFIG_CREDENTIALS_ID = 'kubeconfig'
        FRONTEND_IMAGE = "pes1ug21cs706/frontend"
        BACKEND_IMAGE = "pes1ug21cs706/backend"
        K8S_NAMESPACE = "default"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/vnk123/Smart-home-Energy-Monitoring.git'
            }
        }

        stage('Install Dependencies & Build Frontend') {
            steps {
                sh """
                    cd frontend
                    npm install
                    npm run build
                """
            }
        }

        stage('Install Dependencies & Build Backend') {
            steps {
                sh """
                    cd backend
                    npm install
                """
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        docker build -t $FRONTEND_IMAGE:latest ./frontend
                        docker build -t $BACKEND_IMAGE:latest ./backend
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker push $FRONTEND_IMAGE:latest
                        docker push $BACKEND_IMAGE:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID]) {
                    sh """
                        kubectl apply -f k8s/frontend-deployment.yaml
                        kubectl apply -f k8s/backend-deployment.yaml
                    """
                }
            }
        }
    }
}
