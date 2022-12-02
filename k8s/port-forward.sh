#!/usr/bin/env bash

if [[ $# -eq 3 ]]
then
    NAMESPACE=$1
    echo $(kubectl -n $NAMESPACE get pods|grep $2|cut -d\  -f 1)
    POD=$(kubectl -n $NAMESPACE get pods|grep $2|cut -d\  -f 1)
    echo "port forward pod is $POD"
    kubectl -n $NAMESPACE port-forward $POD $3
else
    echo "usage: $0 <namespace> <podname> <port:port>"
fi
