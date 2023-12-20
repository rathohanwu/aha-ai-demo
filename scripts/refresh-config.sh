#!/bin/bash
kubectl delete secret secret-config
kubectl create secret generic secret-config --from-env-file=../kubernetes/secrets/configuration
