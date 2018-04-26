"use strict";

const PRuntime = require("../../src/core/PRuntime");

/**
 * Test Runtime
 *
 * @extends core.PRuntime
 */
class TestRuntime extends PRuntime {
  constructor() {
    super();
    this.status = "";
  }

  /**
   * The code that executes before the Boot status is achieved.
   */
  beforeBoot() {
    this.status = "beforeBoot";
  }

  /**
   * The code that executes when the Boot status is achieved.
   */
  boot() {
    this.status = "boot";
  }

  /**
   * The code that executes after the Boot status is achieved.
   */
  afterBoot() {
    this.status = "afterBoot";
  }

  /**
   * The code that executes before the Server Online status is achieved.
   */
  beforeOnline() {
    this.status = "beforeOnline";
  }

  /**
   * The code that executes when the Server Online status is achieved.
   */
  online() {
    this.status = "online";
  }

  /**
   * The code that executes after the Server Online status is achieved.
   */
  afterOnline() {
    this.status = "afterOnline";
  }

  /**
   * The code that executes before the Shutdown status is achieved.
   */
  beforeShutdown() {
    this.status = "beforeShutdown";
  }

  /**
   * The code that executes when the Shutdown status is achieved.
   */
  shutdown() {
    this.status = "shutdown";
  }

  /**
   * The code that executes after the Shutdown status is achieved.
   */
  afterShutdown() {
    this.status = "afterShutdown";
  }
}

module.exports = TestRuntime;
