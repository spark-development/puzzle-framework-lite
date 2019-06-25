"use strict";

/** global: puzzle */

const fs = require("fs");
const path = require("path");
const Logger = require("log");

const PLog = require("../core/PLog");

/**
 * Runner Logger class - enables the logging in the entire application, for the task runner part.
 *
 * @memberOf puzzle
 * @extends core.PLog
 */
class RunnerLog extends PLog {
  /**
   * Constructor of the Task Runner Logger class.
   *
   * @param {string} fileName The file used for logging.
   */
  constructor(fileName) {
    super();
    this.initLog(fileName);
  }

  /**
   * Creates the logger object that is going to be used by the application.
   *
   * @param {string} [fileName=""] The logging file.
   */
  initLog(fileName) {
    if (!this.isValid(fileName) || fileName === "") {
      this.logger = new Logger(Logger.DEBUG);
      return;
    }

    /**
     * File Stream used for logger.
     *
     * @property {WriteStream}
     */
    this.stream = fs.createWriteStream(path.resolve(fileName), {
      flags: "a"
    });
    this.logger = new Logger(
      Logger.DEBUG,
      this.stream
    );
  }
}

module.exports = RunnerLog;
