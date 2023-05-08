pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="176295807911"
        AWS_DEFAULT_REGION="us-east-1" 
        CLUSTER_NAME="Angular"
        SERVICE_NAME="angularapp-service"
        TASK_DEFINITION_NAME="angularapp"
        DESIRED_COUNT="1"
        IMAGE_REPO_NAME="angular"
        IMAGE_TAG="${env.BUILD_ID}"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        registryCredential = "176295807911"
    }
    stages {
        stage('Install dependencies') {
            steps {
                // Install Node.js and Angular CLI
//                 sh "curl -sL https://deb.nodesource.com/setup_14.x | bash -"
//                 sh "sudo apt install nodejs"
//                 sh "npm install -g @angular/cli"
//                 // Install project dependencies
                sh "npm install"
            }
        }
//         stage('Build') {
//             steps {
//                 // Build the Angular app
//                 sh "ng build --prod "
// //               --base-href=/myapp/
//             }
//         }
  
        stage("Build Docker image") {
            steps {
                sh "docker build -t ${env.IMAGE_REPO_NAME}:${env.IMAGE_TAG} ."
            }
        }
  
        stage("Push Docker image to ECR") {
            steps {
                withCredentials([
                    [
                        $class: 'AmazonWebServicesCredentialsBinding',
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                        credentialsId: '176295807911'
                    ]
                ]) {
                    sh "aws ecr get-login-password --region ${env.AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_DEFAULT_REGION}.amazonaws.com"
                    sh "docker tag ${env.IMAGE_REPO_NAME}:${env.IMAGE_TAG} ${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_DEFAULT_REGION}.amazonaws.com/${env.IMAGE_REPO_NAME}:${env.IMAGE_TAG}"
                    sh "docker push ${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_DEFAULT_REGION}.amazonaws.com/${env.IMAGE_REPO_NAME}:${env.IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps{
                withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
                    script {
                        sh './script.sh'
                    }
                } 
            }
        }    
    }
}
