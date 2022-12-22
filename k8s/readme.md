# kubernetes deployment

## Docker registry
create a personal access token with write packages permission in github
login to ghcr.io using your github username as name and the generated access token as password

```bash
docker login ghcr.io
```

## nginx
nginx is configured to forward /api requests to quarkus. 
index.html and other files must be copied to the persistent volume nginx-www, then they are available in the browser.

## starting minikube
~~~bash
minikube start
~~~
on osx run:
~~~bash
minikube start --driver=hyperkit 
~~~


## deploy
NOTE: In the followiing commands and in ./deploy.sh you must change caberger to your own github user name!

~~~bash
pushd ../backend
mvn clean compile package install
popd
docker image tag caberger/webpack-demo:1.0.0-SNAPSHOT ghcr.io/caberger/webpack-demo:latest
docker push ghcr.io/caberger/webpack-demo:latest
kubectl delete -f appsrv.yaml
kubectl delete -f busybox-job.yaml
kubectl apply -f namespace.yaml
kubectl apply -f postgres.yaml
kubectl apply -f appsrv.yaml
kubectl apply -f nginx.yaml
kubectl apply -f busybox-job.yaml
~~~
make the docker image public on ghcr.io

to forward nginx to localhost:
~~~bash
./port-forward.sh demo nginx 4200:80
~~~

