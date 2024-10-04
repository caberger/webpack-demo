#/usr/bin/env bash
# build the application, push the docker image and deploy it on the current cluster

set -e
bold=$(tput bold)
normal=$(tput sgr0)

GITHUB_REPO_USER=$(git config --list | grep remote.origin.url | sed -e 's/.*=.*://'| sed -e 's/\(.*\)\/.*/\1/')
GITHUB_USER=$(git config user.name)

echo "helm must be installed..."
helm version

if [[ -z ${GITHUB_USER} ]]
then
    echo "You must set the environment variable GITHUB_USER to your github user name"
    exit 1
fi

if [[ "$GITHUB_USER" == "$GITHUB_REPO_USER" ]]
then
    echo "compile code in your own repo"
else
    echo "Your github user name $GITHIB_USER does not match the repo owner's name $GITHUB_REPO_USER..."
    sleep 1
fi

export GITHUB_USER

docker ps
docker login ghcr.io
echo "building deployment using github account ${bold}$GITHUB_USER${normal}"

#kubectl config set-context --current --namespace $NAMESPACE || (echo "please set up your cloud environment so that the following command works: ${bold}kubectl get nodes${normal}" && exit 2)

pushd backend
    ./build.sh || exit 4
    kubectl rollout restart deployment/appsrv || echo "backend no restart ... propably not deployed yet"
popd

pushd frontend
    ./build.sh
    kubectl rollout restart deployment/nginx || echo "frontend no restart ... propably not deployed yet"
popd

pushd k8s
    ./deploy.sh
popd

