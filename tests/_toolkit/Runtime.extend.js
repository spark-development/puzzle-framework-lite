"use strict";

const Runtime = require("../../src/base/Runtime");

class RuntimeExtend extends Runtime {
  init() {
    this.objectInit = true;
    this.objectRun = false;
  }

  run() {
    this.objectRun = true;
  }
}

module.exports = RuntimeExtend;
