#!/usr/bin/env bash

set -e

rm -rf target
mvn -B clean package
mkdir -p target/deploy
cp target/*-runner.jar target/deploy/
docker build -t backend -f ./src/main/docker/Dockerfile ./target/deploy
