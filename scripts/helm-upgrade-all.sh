#!/bin/bash

helm upgrade api-service ../kubernetes/services/api-service -f  ../kubernetes/services/api-service/values.production.yaml
helm upgrade aha-ai-demo ../kubernetes/clients/aha-ai-demo -f  ../kubernetes/clients/aha-ai-demo/values.production.yaml
