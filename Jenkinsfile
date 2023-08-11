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

        stage('Docker Login') {
          steps {
            withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
            }
          }
        }

        stage('Docker Build') {
      steps {
        sh 'docker buildx build -t ${IMAGE_NAME}:${TAG} .'
      }
        }

        stage('Docker Push') {
      steps {
        sh 'docker push ${IMAGE_NAME}:${TAG}'
      }
        }
    }
}
