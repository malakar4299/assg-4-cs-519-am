#!/bin/bash
brew update
brew install azure-cli
az login
az account set --subscription 50018cb8-40f8-4590-9abe-d5cfe92f0f67
value=$(az functionapp keys set -g assg-3-cs-519-am -n assg-3-am --key-type functionKeys --key-name test-key | jq -r '.value')

echo "{ \"code\":\"$value\" }" > config.json
echo "{ \"code\":\"$value\" }" > ./Frontend/src/utils/config.json
