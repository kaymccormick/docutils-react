pipeline {
    options { timeout(time: 10, unit: 'MINUTES') }
    agent { docker { image 'node:latest' } }
    stages {
        stage('build') {
            steps {
	        sh 'yarn'
		sh 'yarn compile'
		sh 'mkdir -p build'
		sh 'tar --exclude node_modules --exclude build --exclude-vcs -zcv . -f build/docutils-react.tar.gz'

            }
        }
    }

    post {
      always {
      archiveArtifacts artifacts: 'build/docutils-react.tar.gz', fingerprint: true
      }
      }
      
}