# webpack-demo
Demo for school usage: Quarkus Application Server Backend, Single Source Of Truth Web-Application, Kubernetes Cloud Computing

## Overview

This project consists of 3 parts:

- the [quarkus](https://quarkus.io/) microprofile [backend](./backend/) service
- the Frontend Web Application in the [www](./frontend/www/) folder
- the kubernetes deployment in the [k8s](./k8s/) folder

## Building

The backend server must be compiled and deployed to your github container registry. 

Before building you must follow the steps in [readme.md](./k8s/readme.md) in the k8s folder to change the deployment target to your ghcr.io repository on github.

Then run
```bash
./build-and-deploy.sh
```

# Platforms
You can run the application on any kubernetes Platform. 
Examples are:
- [minikube](https://minikube.sigs.k8s.io/docs/)
- Docker - Desktop
- LeoCloud (https://cloud.htl-leonding.ac.at/)
- any other cloud ...

# Requirements
- jdk
- maven
- nodejs
- npm
- VS-Code or Intellij
- portman or docker
- minikube
- kubectl

When using podman it is necessary to set the docker alias:
~~~bash
alias docker=podman
~~~

## MacOS and Linux
Should work out-of-the box

## Windows
Windows users should install [Ubuntu on wsl2](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview).
And then continue using the instructions for linux.

# Installation of Minikube and kubectl (Linux)
There is a script [./k8s/install-kube.sh](./k8s/install-kube.sh) to install minikube and kubectl on Ubuntu.


# Docker-Desktop instead of minikube
Docker-Desktop can be used instead of minikube and portman. In that case kubernetes must be enabled in Docker-Desktop and then the standard storage class must be installed with [docker-standard-storage-class.yaml](./k8s/docker-desktop/docker-standard-storage-class.yaml):  

~~~bash
kubectl apply -f k8s/docker-desktop/docker-standard-storage-class.yaml
~~~

### Installation example for Ubuntu 22
~~~bash
sudo apt install -y openjdk-17-jdk maven nodejs npm podman
~~~