pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="176295807911"
        AWS_DEFAULT_REGION="us-east-1" 
	    CLUSTER_NAME="Nodejs"
	    SERVICE_NAME="nodejsapp-service"
	    TASK_DEFINITION_NAME="sampleapp"
	    DESIRED_COUNT="1"
        IMAGE_REPO_NAME="nodejs"
        IMAGE_TAG="${env.BUILD_ID}"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
	    registryCredential = "176295807911"
    }
    // stages {
    //     stage('Checkout') {
    //         steps {
    //             // Checkout the code from Git repository
    //             checkout([$class: 'GitSCM', branches: [[name: '*/master']], userRemoteConfigs: [[url: 'https://github.com/your/repo.git']]])
    //         }
    //     }
    stage('Install dependencies') {
        steps {
            // Install Node.js and Angular CLI
            sh "curl -sL https://deb.nodesource.com/setup_14.x | bash -"
            sh "apt-get install -y nodejs"
            sh "npm install -g @angular/cli"
            // Install project dependencies
            sh "npm install"
        }
    }
        stage('Build') {
            steps {
                // Build the Angular app
                sh "ng build --prod --base-href=/myapp/"
            }
        }
        stage('Docker Build and Push') {
            steps {
                // Build the Docker image and push it to ECR
                withCredentials([string(credentialsId: 'aws-ecr-credentials', variable: 'DOCKER_REGISTRY_CREDENTIALS')]) {
                    sh "echo ${DOCKER_REGISTRY_CREDENTIALS} | docker login --username AWS --password-stdin ${DOCKER_REGISTRY_URL}"
                }
                sh "docker build -t ${DOCKER_REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ."
                sh "docker push ${DOCKER_REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
            }
        }
        stage('ECS Deployment') {
            steps {
                // Deploy the Docker image to ECS
                withCredentials([string(credentialsId: 'aws-ecr-credentials', variable: 'DOCKER_REGISTRY_CREDENTIALS')]) {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${DOCKER_REGISTRY_URL}"
                }
                sh "aws ecs update-service --cluster ${AWS_ECS_CLUSTER_NAME} --service ${AWS_ECS_SERVICE_NAME} --force-new-deployment --image ${DOCKER_REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
            }
        }
    }
}
