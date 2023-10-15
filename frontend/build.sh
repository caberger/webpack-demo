#!/usr/bin/env bash

set -e

rm -rf ./target
mkdir -p target/nginx

pushd www
    npm install
    npm run build
popd

cp ./docker/default.conf ./target/nginx/

docker build --tag frontend --file ./docker/Dockerfile ./target/
