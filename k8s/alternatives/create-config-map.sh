#!/usr/bin/env bash

kubectl delete configmap download-webcontent
kubectl create configmap download-webcontent --from-file=download-webcontent.sh
