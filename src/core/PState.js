"use strict";

const PRuntime = require("./PRuntime");

/**
 * State machine class to be used in the framework.
 *
 * @memberOf core
 * @extends core.PRuntime
 */
class PState extends PRuntime {
  constructor() {
    super();

    /**
     * Current state of the framework.
     *
     * @property {string}
     * @protected
     */
    this._state = "";
  }

  /**
   * The states should be ReadOnly.
   *
   * @return {object}
   */
  static get STATES() {
    return {
      BOOT: "boot",
      ONLINE: "online",
      SHUTDOWN: "shutdown",
      HALT: "halt",
    };
  }

  /**
   * Returns the current state of the framework.
   *
   * @return {string}
   */
  get state() {
    return this._state;
  }

  /**
   * The code that executes when the Boot status is achieved.
   */
  boot() {
    this._state = PState.STATES.BOOT;
  }


  /**
   * The code that executes when the Server Online status is achieved.
   */
  online() {
    this._state = PState.STATES.ONLINE;
  }

  /**
   * The code that executes when the Shutdown status is achieved.
   */
  shutdown() {
    this._state = PState.STATES.SHUTDOWN;
  }

  /**
   * The code that executes after the Shutdown status is achieved.
   */
  afterShutdown() {
    this._state = PState.STATES.HALT;
  }
}

module.exports = PState;
