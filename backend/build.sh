#!/usr/bin/env bash

set -e

rm -rf target
mvn -Dquarkus.container-image.group=$GITHUB_USER clean package || exit 1
mkdir -p target/deploy
cp target/*-runner.jar target/deploy/
docker build -t appsrv -f ./src/main/docker/Dockerfile ./target/deploy
