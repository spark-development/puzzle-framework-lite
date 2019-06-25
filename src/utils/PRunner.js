"use strict";

/** global: puzzle */

const moment = require("moment");
const path = require("path");

const PObject = require("../core/PObject");
const RunnerLog = require("./RunnerLog");

/**
 * Class used to run a specific task from both Server and CLI runtimes.
 *
 * @abstract
 *
 * @extends core.PObject
 * @memberOf utils
 */
class PRunner extends PObject {
  /**
   * Runner constructor.
   *
   * @param {Object|null} logger Logging class.
   */
  constructor(logger = null) {
    super();

    /**
     * Screen logger reference.
     *
     * @protected
     *
     * @property {Object|null}
     */
    this._logger = logger || puzzle.log;

    /**
     * Runner file logger reference.
     *
     * @protected
     *
     * @property {RunnerLog}
     */
    this._fileLogger = new RunnerLog(this.logFile);

    /**
     * Was the runner executed successfully?
     *
     * @protected
     *
     * @property {boolean}
     */
    this._success = true;
  }

  /**
   * Was the runner executed successfully.
   *
   * @return {boolean}
   */
  get success() {
    return this._success;
  }

  /**
   * Returns the runner log file.
   *
   * @return {string}
   */
  get logFile() {
    const { runner } = puzzle.config.engine;

    const logsLocation = path.resolve(runner.logs);
    const timestamp = moment()
      .format(runner.timestamp);
    return `${logsLocation}/runner.${this.className}.${timestamp}.log`;
  }

  /**
   * Returns the runner logger class.
   *
   * @return {Object}
   */
  get log() {
    return {
      /**
       * Emergency log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      emergency: (...args) => {
        this._fileLogger.emergency(...args);
        if (this.isValid(this._logger)) {
          this._logger.emergency(...args);
        }
      },
      /**
       * Alert log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      alert: (...args) => {
        this._fileLogger.alert(...args);
        if (this.isValid(this._logger)) {
          this._logger.alert(...args);
        }
      },
      /**
       * Critical log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      critical: (...args) => {
        this._fileLogger.critical(...args);
        if (this.isValid(this._logger)) {
          this._logger.critical(...args);
        }
      },
      /**
       * Error log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      error: (...args) => {
        this._fileLogger.error(...args);
        if (this.isValid(this._logger)) {
          this._logger.error(...args);
        }
      },
      /**
       * Warning log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      warning: (...args) => {
        this._fileLogger.warning(...args);
        if (this.isValid(this._logger)) {
          this._logger.warning(...args);
        }
      },
      /**
       * Notice log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      notice: (...args) => {
        this._fileLogger.notice(...args);
        if (this.isValid(this._logger)) {
          this._logger.notice(...args);
        }
      },
      /**
       * Info log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      info: (...args) => {
        this._fileLogger.info(...args);
        if (this.isValid(this._logger)) {
          this._logger.info(...args);
        }
      },
      /**
       * Debug log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      debug: (...args) => {
        this._fileLogger.debug(...args);
        if (this.isValid(this._logger)) {
          this._logger.debug(...args);
        }
      },
    };
  }

  /**
   * Code executed by the runner.
   *
   * @async
   */
  run() {
    this._success = true;
  }
}

module.exports = PRunner;
