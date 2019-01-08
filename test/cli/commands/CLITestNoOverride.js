"use strict";

const CLIBase = require("../../../src/cli/CLIBase");

class CLITestNoOverride extends CLIBase {
  constructor() {
    super("clitestnooverride");
    this.runArgs = [];
    this.runOptions = {};
    this.options = {
      test: [
        "test"
      ]
    };
  }
}

module.exports = CLITestNoOverride;
