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
        withCredentials([sshUserPrivateKey(credentialsId: 'sshUser', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
           script {
                        def remote = [:]
                        remote.name = 'flkipkart-backend'  // Replace with a meaningful remote name
                        remote.host = '99.79.62.126'
                        remote.user = userName
                        remote.identityFile = identity
                        remote.knownHosts = '''|# 99.79.62.126:22 SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.3
|1|pJCuAZ63xQXsloXfBLSsqAKQJAg=|yCblOEYbjfpEF1tKfjOiCY7xlT0= ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCed/35csMVD9Zfia9m58U74e1f67jfQmz7gFZrljCbFSfhGFlMgrHM2jOp8PhjPLEUqnrxOwhet3Cos7ltQQa9S3y5sHDBW+W9SZWqpk8+0vHPHIxvTzLa7fV1VFAhRMRfQcZ1Ga/9FbbozUlxY4zwqhf3zUHzdit8kZgjAxaxYBgpbIlUnVqBwQNl1rl+uBVtvv6ZfBSbP61AZXOc64XGgNC+5SLFWDcA1UbfG4zLbPk8YPeRC/hSoVIYXVK1eezqVtT6CckvJS1sSP7/FicZv/WloLuzcGAWsrBc91nZLfZB6icrFRqPWYYi5rflBd/R2dMtOUBrh5AzMStkYrGUVSmIf3J8Vpng0qd3iJ6FvN8wwy1Ahxy+qh420ztyDXf3DiMlyB+gJrAHd3CeJOfokAYMTvbphKp/eBF68TdWiQMTYFrQ7QDughYzl36MkD2CVXQRHrRzPUMYVEBAbDnXQpP7iwYkfiU3rGpSJbZ/iYOXY38vcEorkN3dlmJI4A0=
|'''
                        sshCommand remote: remote, command: 'cd /home/ubuntu/flipkart-backend; echo "Inside Server"; bash deploy.sh;'
                    }
        
    }
      }
        }
    }
}
