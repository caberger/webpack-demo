#!/usr/bin/env bash

set -e

BASE_HREF=${BASE_HREF:-"/"}

rm -rf ./target
mkdir -p target/nginx
pushd www
    npm install
    npm run build -- --env baseHref=$BASE_HREF
popd
cp ./docker/default.conf target/nginx

docker buildx build --platform linux/amd64 --tag frontend --file ./docker/Dockerfile ./target/
