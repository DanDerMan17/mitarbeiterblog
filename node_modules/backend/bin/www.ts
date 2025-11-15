#!/usr/bin/env node
import app from "../src/app"; // funktioniert nur mit esModuleInterop: true
import http from "http";
import debugLib from "debug";
import {config} from "../src/config";

const debug = debugLib("backend:server");

const port = config.port;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

console.log(" Server läuft auf Port", port);

function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " erfordert Administratorrechte");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " wird bereits verwendet");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  if (!addr) return;
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
