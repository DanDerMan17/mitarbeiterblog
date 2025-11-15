#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app")); // funktioniert nur mit esModuleInterop: true
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const config_1 = require("../src/config");
const debug = (0, debug_1.default)("backend:server");
const port = config_1.config.port;
app_1.default.set("port", port);
const server = http_1.default.createServer(app_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log(" Server läuft auf Port", port);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port))
        return val;
    if (port >= 0)
        return port;
    return false;
}
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
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
    if (!addr)
        return;
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
