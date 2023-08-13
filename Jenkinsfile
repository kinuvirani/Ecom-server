pipeline {
    agent any
    environment {
        IMAGE_NAME = 'vkiran12/flipkart-backend' 
        TAG = 'testing-v1'
    }

    stages {
        stage('Checkout') {
          steps {
            checkout scm
          }
        }

        stage('Build') {
          steps {
            withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
            }
            sh 'docker buildx build -t ${IMAGE_NAME}:${TAG} .'
            sh 'docker push ${IMAGE_NAME}:${TAG}'
            sh 'docker rmi ${IMAGE_NAME}:${TAG}'
          }
        }

      stage('Deploy') {
    agent {
        sshagent(credentials: ['sshUser']) {
            sh 'cd /home/ubuntu/flipkart-backend; echo "Inside Server"; bash deploy.sh;'
        }
    }
}
  }
}
