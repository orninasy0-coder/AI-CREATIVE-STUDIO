const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const PORT = 3000;
const CHECK_INTERVAL = 5000; // Check every 5 seconds
const SERVER_PATH = path.join(__dirname, '.next/standalone/server.js');

function isServerUp() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/',
      method: 'HEAD',
      timeout: 3000,
    }, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

function startServer() {
  console.log(`[${new Date().toISOString()}] Starting server...`);
  const child = spawn('node', [SERVER_PATH], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: String(PORT), HOSTNAME: '0.0.0.0' },
    detached: true,
  });
  child.unref();
  child.stdout.on('data', (d) => process.stdout.write(d));
  child.stderr.on('data', (d) => process.stderr.write(d));
  console.log(`[${new Date().toISOString()}] Server PID: ${child.pid}`);
  return child.pid;
}

async function main() {
  console.log(`[${new Date().toISOString()}] Watchdog started. Monitoring port ${PORT}...`);
  
  while (true) {
    const up = await isServerUp();
    if (!up) {
      console.log(`[${new Date().toISOString()}] Server is DOWN! Restarting...`);
      startServer();
      // Wait a bit for server to start
      await new Promise(r => setTimeout(r, 4000));
      // Verify it came up
      const upNow = await isServerUp();
      console.log(`[${new Date().toISOString()}] Server restart ${upNow ? 'SUCCESS' : 'FAILED'}`);
    }
    await new Promise(r => setTimeout(r, CHECK_INTERVAL));
  }
}

main().catch(console.error);
