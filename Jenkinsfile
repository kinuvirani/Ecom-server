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
    //             script {
    //     def remote = [:]
    //     remote.name = 'devops-project'
    //     remote.host = '99.79.62.126'
    //     remote.knownHosts = '/var/jenkins_home/.ssh/known_hosts'
    //     withCredentials([sshUserPrivateKey(credentialsId: 'sshUser', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
    //     remote.user = userName
    //     remote.identityFile = credentials('sshUser')
        
    //         sshCommand remote: remote, command: 'cd /home/ubuntu/flipkart-backend; echo "Inside Server"; bash deploy.sh;'
    //     }
    // }
         script {
                def remote = [:]
                remote.name = 'devops-project'
                remote.host = '99.79.62.126'
                remote.knownHosts = '/var/jenkins_home/.ssh/known_hosts'
                    sshagent(credentials: ['sshUser']) {
                        sshCommand remote: remote, command: 'cd /home/ubuntu/flipkart-backend; echo "Inside Server"; bash deploy.sh;'
                    }
                }
      }
        }
    }
}
