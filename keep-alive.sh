#!/bin/bash
if ! ss -tlnp 2>/dev/null | grep -q ":3000 "; then
  cd /home/z/my-project
  bun run dev >> dev.log 2>&1 &
fi
