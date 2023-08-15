pipeline {
    agent any
    environment {
        IMAGE_NAME = 'vkiran12/flipkart-backend'       // Replace with your Docker image name
        TAG = 'testing-v1'                           // Replace with your desired tag/version
        KNOWN_HOSTS = '''|1|0WI3Wep/VqJa2vuziq8QEaVoszE=|uoIaPepVVPcn5AFvknap87ddrEk= ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCed/35csMVD9Zfia9m58U74e1f67jfQmz7gFZrljCbFSfhGFlMgrHM2jOp8PhjPLEUqnrxOwhet3Cos7ltQQa9S3y5sHDBW+W9SZWqpk8+0vHPHIxvTzLa7fV1VFAhRMRfQcZ1Ga/9FbbozUlxY4zwqhf3zUHzdit8kZgjAxaxYBgpbIlUnVqBwQNl1rl+uBVtvv6ZfBSbP61AZXOc64XGgNC+5SLFWDcA1UbfG4zLbPk8YPeRC/hSoVIYXVK1eezqVtT6CckvJS1sSP7/FicZv/WloLuzcGAWsrBc91nZLfZB6icrFRqPWYYi5rflBd/R2dMtOUBrh5AzMStkYrGUVSmIf3J8Vpng0qd3iJ6FvN8wwy1Ahxy+qh420ztyDXf3DiMlyB+gJrAHd3CeJOfokAYMTvbphKp/eBF68TdWiQMTYFrQ7QDughYzl36MkD2CVXQRHrRzPUMYVEBAbDnXQpP7iwYkfiU3rGpSJbZ/iYOXY38vcEorkN3dlmJI4A0=
|1|Bs/T8zA4hR9a7+U6xFiyo2f5HE8=|6v8gMNJiJLzJTQb7N8tjn2vRqFg= ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBHdOhf1h03iC5SjPRFpQuHlnMBaNsNJW+SsXBQU5hXuMJqBNBKVg/F1uyXkDoe8zVw1D2AyJ7QJdoTvGqA/ZA6Y=
|1|DAFHOpafklOwYFVi1lk6f+jlD38=|0hNmekYzuZBxyniQgBmMBuEG3S4= ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID7K2tw/+IhH2hQ2Iu9nOroXDZD8p37RNZXL3SY81YS7
                         # Add the rest of the known hosts entry here
                      '''
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
      steps {
                script {
        def remote = [:]
        remote.name = 'devops-project'
        remote.host = '99.79.62.126'
        remote.knownHosts= KNOWN_HOSTS
        withCredentials([sshUserPrivateKey(credentialsId: 'sshUser', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
        remote.user = userName
        remote.identityFile = identity
        
            sshCommand remote: remote, command: 'cd /home/ubuntu/flipkart-backend; echo "Inside Server"; bash deploy.sh;'
        }
    }
      }
        }
    }
}
