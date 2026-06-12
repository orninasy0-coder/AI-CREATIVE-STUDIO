#!/bin/bash
cd /home/z/my-project
while true; do
  echo "[$(date)] Starting server..." >> server-wrapper.log
  node .next/standalone/server.js 2>&1 >> server-wrapper.log
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE" >> server-wrapper.log
  sleep 2
done
