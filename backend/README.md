# Demo Backend

## building a docker image

We use [jib](https://quarkus.io/guides/container-image) to build a container image with:

~~~bash
mvn clean install
docker image ls
~~~

## using the minikube registry
In order to make docker accept pushing images to this registry, we have to redirect port 5000 on the docker virtual machine over to port 5000 on the minikube machine. We can (ab)use docker’s network configuration to instantiate a container on the docker’s host, and run socat there (see [minikube documentation](https://minikube.sigs.k8s.io/docs/handbook/registry/)):
~~~bash
docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"
~~~
After the image is pushed, refer to it by localhost:5000/{name} in kubectl specs.



