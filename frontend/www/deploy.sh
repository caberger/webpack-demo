#!/usr/bin/env bash
set -e


npm install
npm run build

KNIFE_POD=""
findPod() {
    KNIFE_POD=$(kubectl get pods|grep -i Running|grep knife|cut -d\  -f 1)
}
waitForPod() {
    local status
    while [ "$KNIFE_POD." == "." ]
    do
        findPod || echo "not found"
        status=$(kubectl get pods | grep knife)
        printf "%s %s              " $status
        printf "\r"
        sleep 1
    done
    echo ""
    echo "pod $KNIFE_POD ready"
}

kubectl apply -f ../../k8s/persistent-volume-claim.yaml
kubectl apply -f ./busybox-job.yaml
echo "waiting for our swiss army knife..."
waitForPod knife

echo "copy to demo..."
kubectl exec $KNIFE_POD -- rm -rf /srv/demo /srv/dist
kubectl cp ./dist $KNIFE_POD:/srv/
kubectl exec $KNIFE_POD -- mv /srv/dist /srv/demo
kubectl delete job knife
