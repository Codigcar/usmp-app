pipeline {
  agent {
     node {
        label 'jenkins_agent'
        }
  }
  
  tools {
    nodejs "Node 20"
  }

  environment {
    GOOGLE_APPLICATION_CREDENTIALS = credentials('USMP-AUTH-DISTRIBUTION-CREDENTIAL')
  }

  stages {
    stage('Install and compile') {
      steps {
        sh 'npm install --global yarn && yarn install && yarn android:apk'
      }
    }
    stage('Desplegando Apptester') {
      steps {
        sh 'firebase appdistribution:distribute android/app/build/outputs/apk/release/app-release.apk \
                --app 1:1011299057704:android:b1892b9c31d4364d62751d  \
                --release-notes "Prueba USMP" --groups "dev-team"'
      }
    }
  }
}
