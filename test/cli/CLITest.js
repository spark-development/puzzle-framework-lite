"use strict";

const CLIBase = require("../../src/cli/CLIBase");

class CLITest extends CLIBase {
  constructor() {
    super('clitest');
    this.runArgs = [];
    this.runOptions = {};
    this.options = {
      test: [
        'test'
      ]
    }
  }

  run(args, options) {
    this.runArgs = args;
    this.runOptions = options;
  }
}

module.exports = CLITest;
