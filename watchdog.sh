#!/bin/bash
cd /home/z/my-project
while true; do
  if ! ss -tlnp 2>/dev/null | grep -q ":3000 "; then
    echo "$(date): Starting server..." >> dev.log
    bun run dev >> dev.log 2>&1 &
    SERVER_PID=$!
    echo "$(date): Server PID: $SERVER_PID" >> dev.log
    # Wait for it to start
    for i in $(seq 1 10); do
      sleep 1
      if ss -tlnp 2>/dev/null | grep -q ":3000 "; then
        echo "$(date): Server is listening" >> dev.log
        break
      fi
    done
  fi
  sleep 3
done
