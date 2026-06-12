#!/bin/bash
cd /home/z/my-project

# Install deps if needed
bun install --frozen-lockfile 2>/dev/null || bun install 2>/dev/null

# Start dev server - write directly to log file, no tee/pipe
npx next dev -p 3000 > dev.log 2>&1
