#!/usr/bin/env bash

pushd backend
mvn clean
mvn package install || exit
popd

pushd www
npm install
npm run build || exit
popd

pushd k8s
./deploy.sh
popd

pushd www
./deploy.sh
popd