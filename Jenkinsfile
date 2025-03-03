pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        KUBECONFIG_CREDENTIALS_ID = 'kubeconfig'
        DOCKERHUB_USERNAME = 'pes1ug21cs706'
        FRONTEND_IMAGE = "pes1ug21cs706/frontend:latest"
        BACKEND_IMAGE = "pes1ug21cs706/backend:latest"
        K8S_NAMESPACE = "default"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    try {
                        checkout([
                            $class: 'GitSCM',
                            branches: [[name: 'main']], 
                            userRemoteConfigs: [[
                                url: 'git@github.com:vnk123/Smart-home-Energy-Monitoring-.git',
                                credentialsId: 'Jenkins Server Key' 
                            ]]
                        ])
                    } catch (Exception e) {
                        error "❌ Git checkout failed: ${e.message}"
                    }
                }
            }
        }

        stage('Build & Test') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                            sh 'npm run build'
                            sh 'npm test'
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    }
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        try {
                            sh """
                                docker build -t $FRONTEND_IMAGE ./frontend
                                docker build -t $BACKEND_IMAGE ./backend
                                docker login -u $DOCKER_USER -p $DOCKER_PASS
                                docker push $FRONTEND_IMAGE
                                docker push $BACKEND_IMAGE
                            """
                        } catch (Exception e) {
                            error "❌ Docker build/push failed: ${e.message}"
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID]) {
                    script {
                        try {
                            sh """
                                kubectl apply -f k8s/frontend-deployment.yaml
                                kubectl apply -f k8s/backend-deployment.yaml
                                kubectl apply -f k8s/mongo-deployment.yaml  # Deploy MongoDB
                            """
                        } catch (Exception e) {
                            error "❌ Kubernetes deployment failed: ${e.message}"
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Build or Deployment Failed! Check logs for details.'
        }
    }
}
