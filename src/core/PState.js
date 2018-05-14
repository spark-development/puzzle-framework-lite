"use strict";

const PRuntime = require("./PRuntime");

/**
 * State machine class to be used in the framework.
 *
 * @memberOf core
 * @extends core.PRuntime
 */
class PState extends PRuntime {
  /**
   * Constructor of the PState class.
   */
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
      INVALID: ""
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
    super.boot();
    this._state = PState.STATES.BOOT;
  }

  /**
   * The code that executes when the Server Online status is achieved.
   */
  online() {
    if (this._state !== PState.STATES.BOOT) {
      this._state = PState.STATES.INVALID;
      return;
    }
    super.online();
    this._state = PState.STATES.ONLINE;
  }

  /**
   * The code that executes when the Shutdown status is achieved.
   */
  shutdown() {
    if (this._state !== PState.STATES.BOOT && this._state !== PState.STATES.ONLINE) {
      this._state = PState.STATES.INVALID;
      return;
    }
    super.shutdown();
    this._state = PState.STATES.SHUTDOWN;
  }

  /**
   * The code that executes after the Shutdown status is achieved.
   */
  afterShutdown() {
    if (this._state !== PState.STATES.SHUTDOWN) {
      this._state = PState.STATES.INVALID;
      return;
    }
    super.afterShutdown();
    this._state = PState.STATES.HALT;
  }
}

module.exports = PState;
