"use strict";

const PUse = require("../core/PUse");

/**
 * Logger class - enables the logging in the entire application.
 *
 * @memberOf puzzle
 * @abstract
 * @extends core.PObject
 */
class Log extends PUse {
  constructor() {
    super();
    /**
     * The level of detail the log contains.
     *
     * @property {string}
     */
    this.logLevel = "";
    /**
     * The Log instance class.
     *
     * @property {*}
     */
    this.logger = null;
    this.initLog();
  }

  /**
   * Creates the logger object that is going to be used by the application.
   *
   * @param [{string}] logLevel The level of logging.
   */
  initLog(logLevel) {
  }

  /**
   * Attaches the logger to the engine.
   *
   * @param {PEngine} engine The reference to engine class
   */
  use(engine) {
    engine.log = this;
  }
}

module.exports = Log;
