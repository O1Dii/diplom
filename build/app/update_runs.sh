#!/bin/bash

while true; do
  pipenv run flask api update_runs
  sleep 1m;
done