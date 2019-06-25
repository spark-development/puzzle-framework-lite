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
     * Should the file logging be disabled?
     *
     * @protected
     *
     * @property {boolean}
     */
    this._disableFileLogging = false;

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
    const timestamp = moment().format(runner.timestamp);
    return `${logsLocation}/runner.${this.className}.${timestamp}.log`;
  }

  /**
   * Enable the file logging system.
   */
  enableFileLogging() {
    this._disableFileLogging = false;
  }

  /**
   * Disable the file logging system.
   */
  disableFileLogging() {
    this._disableFileLogging = true;
  }

  /**
   * Logs a message in the logger.
   *
   * @protected
   *
   * @param {string} type The type of message.
   * @param {...*} [args] The messages to be logged.
   */
  _log(type, ...args) {
    type = type.toLowerCase();
    if (!this._disableFileLogging) {
      this._fileLogger.logger[type](...args);
    }

    if (this.isValid(this._logger)) {
      this._logger[type](...args);
    }
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
        this._log("emergency", ...args);
      },
      /**
       * Alert log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      alert: (...args) => {
        this._log("alert", ...args);
      },
      /**
       * Critical log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      critical: (...args) => {
        this._log("critical", ...args);
      },
      /**
       * Error log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      error: (...args) => {
        this._log("error", ...args);
      },
      /**
       * Warning log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      warning: (...args) => {
        this._log("warning", ...args);
      },
      /**
       * Notice log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      notice: (...args) => {
        this._log("notice", ...args);
      },
      /**
       * Info log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      info: (...args) => {
        this._log("info", ...args);
      },
      /**
       * Debug log message.
       *
       * @param {...*} [args] The messages to be logged.
       */
      debug: (...args) => {
        this._log("debug", ...args);
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
