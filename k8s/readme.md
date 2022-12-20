# kubernetes deployment

## nginx
nginx is configured to forward /api requests to quarkus. 
index.html and other files must be copied to the persistent volume nginx-www, then they are available in the browser.

## deploy

~~~bash
pushd backend
mvn clean compile package install
docker image tag caberger/webpack-demo:1.0.0-SNAPSHOT ghcr.io/caberger/webpack-demo:latest
docker push ghcr.io/caberger/webpack-demo:latest
pushd ../k8s
kubectl delete -f application.yaml
kubectl apply -f application.yaml
popd
#kubectl -n yaec rollout restart deployment appsrv
popd
~~~
make the docker image public on ghcr.io
