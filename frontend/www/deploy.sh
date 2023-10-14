#!/usr/bin/env bash
set -e

npm install
npm run build

KNIFE_POD=""
findPod() {
    KNIFE_POD=$(kubectl get pods|grep -i Running|grep knife|cut -d\  -f 1)
}
waitForPod() {
    local pod=""
    while [ "$KNIFE_POD." == "." ]
    do
        findPod
        echo "$(kubectl get pods | grep knife)"
        echo "waiting for our swiss army knife to be ready..."        
        sleep 2
    done
    echo "pod $KNIFE_POD ready"
}
waitForPod knife

echo "copy to demo..."
kubectl exec $KNIFE_POD -- rm -rf /srv/demo /srv/dist
kubectl cp ./dist $KNIFE_POD:/srv/
kubectl exec $KNIFE_POD -- mv /srv/dist /srv/demo
