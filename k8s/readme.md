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
NOTE: You must change caberger to your own github user name in ./deploy.sh

DO NOT FORGET: make the docker image public on ghcr.io

to forward nginx to localhost:
~~~bash
./port-forward.sh demo nginx 4200:80
~~~

