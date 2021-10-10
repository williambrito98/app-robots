"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listenClose = listenClose;
exports.sendMessage = sendMessage;

var _worker_threads = require("worker_threads");

function listenClose() {
  if (_worker_threads.parentPort) {
    _worker_threads.parentPort.on('message', msg => {
      console.log(msg);

      if (msg === 'close') {
        process.exit(0);
      }
    });
  }
}

function sendMessage(message) {
  if (_worker_threads.parentPort) {
    _worker_threads.parentPort.postMessage(message);
  }
}