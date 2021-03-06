"use strict";

/** global: puzzle */

const PRuntime = require("../core/PRuntime");

/**
 * Bootstrap elements for server part of the framework.
 *
 * @memberOf puzzle
 * @extends core.PRuntime
 */
class ServerBootstrap extends PRuntime {
  /**
   * Register process handlers and display some messages in log before
   * starting the application.
   */
  beforeBoot() {
    puzzle.log.info("Application started");
    puzzle.log.info("-".repeat(30));
    puzzle.log.info(`Puzzle Framework Version: ${puzzle.version.version}`);
    puzzle.log.info(`Framework type: ${puzzle.lite ? "Lite" : "Full"}`);
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
    const { puzzle } = global;

    if (this.isValid(puzzle) && this.isValid(puzzle.modules)) {
      puzzle.modules.shutdown();
    }
    if (err && this.isValid(puzzle) && this.isValid(puzzle.log)) {
      puzzle.log.error(err);
      puzzle.log.info("Application closed");
    }
    if (options && options.exit) {
      process.exit();
    }
  }
}

module.exports = ServerBootstrap;
