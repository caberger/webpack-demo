# webpack-demo
Demo for school usage: Quarkus Application Server Backend, Single Source Of Truth Web-Application, Kubernetes Cloud Computing.
Included is a Github Action to upload the compiled binaries to github as release artifacts.

## Overview

This project consists of 3 parts:

- the [quarkus](https://quarkus.io/) microprofile [backend](./backend/) service
- the Frontend Web Application in the [www](./frontend/www/) folder
- the kubernetes deployment in the [k8s](./k8s/) folder

## Building

## Requirements

1. Be sure that you have minikube installed or a configuration for any other cloud. 
The following command must work:
```bash
kubectl get nodes
```
2. Be sure that your github user.name setting is correct, see the [git cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf)

```bash
git config --list
```
the *user.name* displayed must be the same as your github user name where you plan to upload your docker images.

The backend server must be compiled and deployed to your github container registry. 
To be sure to have a clean start run the following:
```bash
minikube delete
rm -rf  ~/.minikube/cache/
./k8s/clean-all-docker.sh
minikube start
```

Before building you must follow the steps in [readme.md](./k8s/readme.md) in the k8s folder to change the deployment target to your ghcr.io repository on github.

Then run
```bash
./build-and-deploy.sh
```

After that go to your githib packes view and change the package visability to public.

# Platforms
You can run the application on any kubernetes Platform. 
Examples are:
- [minikube](https://minikube.sigs.k8s.io/docs/)
- LeoCloud (https://cloud.htl-leonding.ac.at/)
- any other cloud ...

# Requirements
- jdk
- maven
- nodejs
- npm
- VS-Code or Intellij
- Podman
- minikube
- kubectl
- helm

## MacOS
Should work out-of-the box

## Linux
First [install docker](https://docs.docker.com/engine/install/ubuntu/).
Then add your user to the docker group:
~~~bash
sudo usermod -aG docker $USER
~~~
Then logout and login again.

Now you can start docker with:
~~~bash
sudo service docker start
~~~
There is a script [./k8s/install-kube.sh](./k8s/install-kube.sh) to install minikube and kubectl on Ubuntu.

After that start minikube and check that minikube is ready:
~~~bash
minikube start
minikube addons enable dashboard
minikube addons enable metrics-server
minikube dashboard
kubectl get nodes
~~~

## Windows
Windows users should install [Ubuntu on wsl2](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview).
And then continue using the instructions for linux.



# Docker-Desktop instead of minikube
Docker-Desktop can be used instead of minikube and portman. In that case kubernetes must be enabled in Docker-Desktop and then the standard storage class must be installed with [docker-standard-storage-class.yaml](./k8s/docker-desktop/docker-standard-storage-class.yaml):  

~~~bash
kubectl apply -f k8s/docker-desktop/docker-standard-storage-class.yaml
~~~

### Installation example for Ubuntu 22
~~~bash
sudo apt install -y openjdk-17-jdk maven nodejs npm podman
~~~

## Technologies used:
- [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- [HTML Template Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
- [immerjs](https://immerjs.github.io/immer/)
- [reactive Extensions](https://rxjs.dev/)
- Typescript
- [Webpack](https://webpack.js.org/)

## Rootless minikube

```bash
minikube config set rootless true
minikube start --driver=podman --container-runtime=containerd
```

## Deploy the frontend to a subfolder of a domain

See [./frontend/readme.md](./frontend/readme.md) for how to set BASE_HREF
