#!/usr/bin/env bash
set -e

echo "check that docker is available"
docker ps

# docker package names cannot contain uppercase letters:
LC_GH_USER_NAME="$(echo "$GITHUB_USER" | tr '[:upper:]' '[:lower:]')"
BACKEND_IMAGE_NAME=ghcr.io/$LC_GH_USER_NAME/backend:latest
FRONTEND_IMAGE_NAME=ghcr.io/$LC_GH_USER_NAME/frontend:latest

export BACKEND_IMAGE_NAME
export FRONTEND_IMAGE_NAME

bold=$(tput bold)
normal=$(tput sgr0)

IS_DOCKER_DESKTOP=$(kubectl get nodes | grep "docker-desktop"| wc -l)

if [[ "$IS_DOCKER_DESKTOP" -eq "1" ]]
then
    kubectl apply -f docker-desktop/docker-standard-storage-class.yaml
else
    echo "not on docker desktop, standard storage class exists, skipping."
fi

echo "TAG and push image $BACKEND_IMAGE_NAME and $FRONTEND_IMAGE_NAME..."

docker image tag backend $BACKEND_IMAGE_NAME
docker push $BACKEND_IMAGE_NAME

docker image tag frontend $FRONTEND_IMAGE_NAME
docker push $FRONTEND_IMAGE_NAME
docker image ls

kubectl delete configmap nginx-config || echo "nginx-config does not yet exist"
kubectl create configmap nginx-config --from-file ../frontend/docker/default.conf

kubectl get pods

echo "----------"
echo "DO NOT FORGET: make the ${bold}docker image public${normal} on ghcr.io"
echo "----------"

echo "run the following to follow the deployment:"
echo "kubectl get pods --watch"

#POD=$(kubectl get pods | grep nginx | cut -d\  -f 1)
#echo "when all pods are running enter the following:"
#echo "=============================================="
#echo "${bold}kubectl port-forward $POD 4200:80${normal}"
#echo "=============================================="
#echo "then open http://localhost:4200 in your browser"

echo "you should run:"
echo "helm install leocloud-demo  --set backend.image=$BACKEND_IMAGE_NAME,frontend.image=$FRONTEND_IMAGE_NAME,ingress.host=it20.....cloud.htl-leonding.ac.at ./k8s/demo-chart"
