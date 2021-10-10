"use strict";

var _RobotWorker = require("./Worker/RobotWorker");

(async () => {
  const w = new _RobotWorker.RobotWorker('./dist/index.js');
})();