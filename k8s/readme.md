# kubernetes deployment


## Docker registry
create a personal access token with write packages permission in github.

Then login to ghcr.io from the command line using your github username as name and the generated access token as password

```bash
docker login ghcr.io
```

## deploy

DO NOT FORGET: make the docker image public on ghcr.io
adjust your values in ./k8s/demo-chart and the run:
```bash
helm install leocloud-demo  --set backend.image=$BACKEND_IMAGE_NAME,frontend.image=$FRONTEND_IMAGE_NAME ./k8s/demo-chart"
```

## appsrv

Here the application server does not wait for the database in a loop. Instead the livenessProbe will fail an the situation is handled by the kube controller
