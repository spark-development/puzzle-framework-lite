"use strict";

const PRuntime = require("../core/PRuntime");

/**
 * Bootstrap elements for server part of the framework.
 *
 * @memberOf puzzle
 * @extends core.PRuntime
 */
class ServerBootstrap extends PRuntime {
  beforeBoot() {
    puzzle.log.info("Application started");
    puzzle.log.info("-".repeat(30));
    puzzle.log.info(`Puzzle Framework Version: ${puzzle.version.version}`);
    puzzle.log.info(`Environment: ${puzzle.env}`);
    puzzle.log.info(`Logging level: ${puzzle.logLevel}`);
    puzzle.log.info("-".repeat(30));

    // do something when app is closing
    process.on("exit", this.close.bind(this, {}));

    // catches ctrl+c event
    process.on("SIGINT", this.close.bind(this, {
      exit: true
    }));

    // catches uncaught exceptions
    process.on("uncaughtException", this.close.bind(this, {
      exit: true
    }));
  }

  /**
   * Shut downs the server.
   */
  shutdown() {
    super.shutdown();
    if (this.isValid(puzzle.server)) {
      puzzle.log.info("Shutting down the HTTP server");
      puzzle.server.close();
    }
  }

  /**
   * Event called when the application is closed.
   *
   * @param {Object} options The options sent by the closing event.
   * @param {Object} err The errors sent by the closing event.
   */
  close(options, err) {
    if (err) puzzle.log.error(err.stack);
    if (options.exit) process.exit();

    puzzle.modules.shutdown();
    puzzle.log.info("Application closed");
  }
}

module.exports = ServerBootstrap;
