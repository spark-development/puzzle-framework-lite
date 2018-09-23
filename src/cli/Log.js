"use strict";

/** global: puzzle */

const PLog = require("../core/PLog");

/**
 * Logger class - enables the logging in the entire application.
 *
 * @memberOf puzzle
 * @extends core.PLog
 * @alias cli.Log
 */
class Log extends PLog {
  /**
   * CLI Logger class constructor.
   */
  constructor() {
    super();
    this.logLevel = "";
    this.initLog();
  }

  /**
   * Creates the logger object that is going to be used by the application.
   *
   * @param [{string}] logLevel The level of logging.
   */
  initLog(logLevel) {
    this.logger = {
      emergency: () => "",
      alert: () => "",
      critical: () => "",
      error: () => "",
      warning: () => "",
      notice: () => "",
      info: () => "",
      debug: () => ""
    };
  }
}

module.exports = Log;
