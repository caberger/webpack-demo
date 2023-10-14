#!/usr/bin/env bash
set -e

IMAGE_NAME=ghcr.io/$GITHUB_USER/webpack-demo:latest

bold=$(tput bold)
normal=$(tput sgr0)

IS_DOCKER_DESKTOP=$(kubectl get nodes | grep "docker-desktop"| wc -l)

if [[ "$IS_DOCKER_DESKTOP" -eq "1" ]]
then
    kubectl apply -f docker-desktop/docker-standard-storage-class.yaml
else
    echo "not on docker desktop, standard storage class exists, skipping."
fi

echo "TAG and push image $IMAGE_NAME..."
docker image tag appsrv $IMAGE_NAME
docker push $IMAGE_NAME

rm -rf target && mkdir -p target
for yaml in *.yaml
do
    envsubst '$GITHUB_USER,BASE_HREF' < $yaml > ./target/$yaml
done
pushd target
    for yaml in *.yaml
    do
        kubectl apply -f $yaml
    done
popd
kubectl get pods

echo "----------"
echo "DO NOT FORGET: make the ${bold}docker image public${normal} on ghcr.io"
echo "----------"
