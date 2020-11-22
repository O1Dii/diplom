#!/bin/bash

# if we have cygpath then this is cygwin
if hash cygpath 2>/dev/null; then
  PWD=$(cygpath "$PWD" -w)
fi

# if we have .env source this file for DATABASE_URL
# is using local development, update host file and set DATABASE_URL hostname to host.docker.internal
#   127.0.0.1 host.docker.internal

set -o allexport
if [[ -f .env ]]; then
  source .env
fi
set +o allexport

docker build \
  --build-arg NODE_ENV="production" \
  . --file build/app/Dockerfile --tag "$1" \
  && docker run \
    -e RUN_MODE=db_migrate \
    -e DATABASE_URL="$DATABASE_URL" \
    "$1" \
  && docker run \
    -e RUN_MODE=test \
    "$1" \
  && echo "Looks like this works"