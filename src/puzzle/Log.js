"use strict";

const fs = require("fs");
const log = require("log");
const path = require("path");
const { rotator: rotate } = require("logrotator");

const PLog = require("../core/PLog");

/**
 * Logger class - enables the logging in the entire application.
 *
 * @memberOf puzzle
 * @extends core.PLog
 * @alias puzzle.log
 */
class Log extends PLog {
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
    if (this.isValid(logLevel) && logLevel !== "") {
      this.logLevel = logLevel;
    }

    if (this.isValid(logConfig.file) && logConfig.file !== "") {
      if (logConfig.rotate === true) {
        rotate.register(logConfig.file, {
          count: logConfig.count,
          size: logConfig.size,
          compress: logConfig.compress
        });
      }
      this.logger = new log(
        this.logLevel,
        fs.createWriteStream(path.resolve(logConfig.file), {
          flags: "a"
        })
      );
    }

    this.logger = new log(this.logLevel);
  }
}

module.exports = Log;
