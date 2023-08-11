pipeline {
    agent any
    environment {
        IMAGE_NAME = 'vkiran12/flipkart-backend'       // Replace with your Docker image name
        TAG = 'testing-v1'                           // Replace with your desired tag/version
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
