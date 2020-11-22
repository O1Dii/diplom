#!/bin/bash

while true; do
  pipenv run flask api cron_analysis_api
  sleep 1d;
done