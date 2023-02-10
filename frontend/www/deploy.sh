#!/usr/bin/env bash

npm install
npm run build

KNIFE_POD=""
findPod() {
    KNIFE_POD=$(kubectl -n student-c-aberger get pods|grep -i Running|grep knife|cut -d\  -f 1)
}
waitForPod() {
    local pod=""
    while [ "$KNIFE_POD." == "." ]; do
        findPod $1
        echo "waiting for busybox pod to be ready..."        
        sleep 1
    done;
    echo "pod $KNIFE_POD ready"
}
waitForPod knife

echo "copy to demo..."
kubectl -n student-c-aberger exec $KNIFE_POD -- rm -rf /srv/demo /srv/dist
kubectl -n student-c-aberger cp ./dist $KNIFE_POD:/srv/
kubectl -n student-c-aberger exec $KNIFE_POD -- mv /srv/dist /srv/demo
