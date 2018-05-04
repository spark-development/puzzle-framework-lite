"use strict";

const PRuntime = require("../core/PRuntime");

/**
 * Bootstrap elements for console part of the framework.
 *
 * @memberOf cli
 * @extends core.PRuntime
 */
class ConsoleBootstrap extends PRuntime {
  /**
   * Attaches some process listeners.
   */
  beforeBoot() {
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
   * Event called when the application is closed.
   *
   * @param {Object} options The options sent by the closing event.
   * @param {Object} err The errors sent by the closing event.
   */
  close(options, err) {
    if (err) puzzle.log.error(err.stack);
    if (options.exit) process.exit();
  }
}

module.exports = ConsoleBootstrap;
