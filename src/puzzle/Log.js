"use strict";

const fs = require("fs");
const path = require("path");
const logger = require("log");
const { rotator: rotate } = require("logrotator");

const PLog = require("../core/PLog");

/**
 * Logger class - enables the logging in the entire application, for the server part.
 *
 * @memberOf puzzle
 * @extends core.PLog
 * @alias puzzle.log
 */
class Log extends PLog {
  /**
   * Constructor of the Server Kigger class.
   */
  constructor() {
    super();
    this.logLevel = puzzle.config.engine.debug ? "debug" : puzzle.config.engine.log.level;
    this.initLog();
  }

  /**
   * Creates the logger object that is going to be used by the application.
   *
   * @param [{string}] logLevel The level of logging.
   */
  initLog(logLevel) {
    const { log: logConfig } = puzzle.config.engine;
    const validLogLevel = [
      "emergency",
      "alert",
      "critical",
      "error",
      "warning",
      "notice",
      "info",
      "debug"
    ];

    if (this.isValid(logLevel) && logLevel !== "" && typeof logLevel === "string") {
      this.logLevel = logLevel;
    }
    if (validLogLevel.indexOf(this.logLevel) < 0) {
      this.logLevel = "info";
    }

    if (!this.isValid(logConfig.file) || logConfig.file === "") {
      this.logger = new logger(this.logLevel);
      return;
    }

    if (logConfig.rotate === true) {
      rotate.register(logConfig.file, {
        schedule: logConfig.schedule || "5m",
        count: logConfig.count,
        size: logConfig.size,
        compress: logConfig.compress
      });
    }

    /**
     * File Stream used for logger.
     *
     * @property {WriteStream}
     */
    this.stream = fs.createWriteStream(path.resolve(logConfig.file), {
      flags: "a"
    });
    this.logger = new logger(
      this.logLevel,
      this.stream
    );
  }
}

module.exports = Log;
