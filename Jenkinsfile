pipeline {
    agent any
    environment {
        IMAGE_NAME = 'vkiran12/flipkart-backend'       // Replace with your Docker image name
        TAG = 'testing-v1'                           // Replace with your desired tag/version
        KNOWN_HOSTS = '''your.remote.server.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCx0q7cacoShKTXD1IiJGKiDWOsDbt71gHHVc33kWJ9upHDJQSm47kA7bi0DbTlWLXarKaQ4V2TdPiNUlIZxHUS/TrpYZKn9JpLwUmcrpUgdhOpKna2GQJ3gdfA0+RXeXz5vHdaAls0eRBW3AOuCiv07d/Mj+C5cKUiaJfaff7qEPmJjoARBsQGSSZ22Mk1oCx1Fg5sLqb7DywaLTOgSi4HoYvhCHEtwYTxWKSL6GXE6rl7LEFzeViBI53lOZxnaCKUjmYSjCRpEyLapZkVTqnPalJWHoVzrugWI0IZ5ubYO6EAg80OegBzjXWRowyPsJK1vv/e1Eg0jJCbsxJVSesAu8CQZ8Ekfb+XAOP1+6P4vas+j2Nv2yC9Jo5KHh0OJDu45Ct9kgYNcoa6kNw/SlzQjCPX21P6gpRnqQoIhbYX5PLycUhdsnn1e4yD375xaromJi8VZgDUCjoaYPJRvQcgLoghMso3glMFwdrwHs6/dcS8xEQvDW1P6OQ8gauIQd/1vXKb+7aqlxhcW7x0gO1y9DgB8lwNDD81ye8kxAQoylyUMpMAsI3ak3BDMiSSFa7pffBcqTm43Fr9gQ+BcQwh5Xr0uhKPdvz3+AcpPjRiGlpvC8xiHkvBXw+rEzUAYYz0it/rb2lsPIc1W9fH4T7pXL+698K9ewHToK0is94Vfw== kiran-devops-server
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
