pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'your-react-app'
        BACKEND_IMAGE = 'your-backend-app'
        DOCKER_REGISTRY = 'your-docker-registry'
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    // Build the frontend Docker image
                    sh 'docker build -t $DOCKER_REGISTRY/$FRONTEND_IMAGE -f Dockerfile.frontend .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    // Build the backend Docker image
                    sh 'docker build -t $DOCKER_REGISTRY/$BACKEND_IMAGE -f Dockerfile.backend .'
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    // Push both frontend and backend images to Docker registry
                    sh 'docker push $DOCKER_REGISTRY/$FRONTEND_IMAGE'
                    sh 'docker push $DOCKER_REGISTRY/$BACKEND_IMAGE'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Update frontend and backend deployments in Kubernetes
                    sh 'kubectl set image deployment/frontend frontend=$DOCKER_REGISTRY/$FRONTEND_IMAGE --record'
                    sh 'kubectl set image deployment/backend backend=$DOCKER_REGISTRY/$BACKEND_IMAGE --record'
                }
            }
        }
    }
}
