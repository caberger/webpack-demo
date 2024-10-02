#!/usr/bin/env bash

set -e

rm -rf target
mvn -B clean package
mkdir -p target/deploy
cp target/*-runner.jar target/deploy/

docker buildx build --platform linux/amd64 --tag backend --file ./src/main/docker/Dockerfile ./target/deploy
