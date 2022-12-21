# kubernetes deployment

## nginx
nginx is configured to forward /api requests to quarkus. 
index.html and other files must be copied to the persistent volume nginx-www, then they are available in the browser.

## deploy

~~~bash
pushd ../backend
mvn clean compile package install
popd
docker image tag caberger/webpack-demo:1.0.0-SNAPSHOT ghcr.io/caberger/webpack-demo:latest
docker push ghcr.io/caberger/webpack-demo:latest
kubectl delete -f appsrv.yaml
kubectl apply -f namespace.yaml
kubectl apply -f postgres.yaml
kubectl apply -f appsrv.yaml
kubectl apply -f nginx.yaml
~~~
make the docker image public on ghcr.io

to forward nginx to localhost:
~~~bash
./port-forward.sh demo nginx 4200:80
~~~

