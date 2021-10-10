"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RobotWorker = void 0;

var _worker_threads = require("worker_threads");

class RobotWorker extends _worker_threads.Worker {
  constructor(absolutePathFileInitRobot) {
    super(absolutePathFileInitRobot);
    this.absolutePathFileInitRobot = absolutePathFileInitRobot;
  }

  sendMessage(message) {
    this.postMessage(message);
  }

  closeWorker() {
    this.sendMessage('close');
  }

  listenMessagem() {
    return this.on('message', msg => msg);
  }

}

exports.RobotWorker = RobotWorker;