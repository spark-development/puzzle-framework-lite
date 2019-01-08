"use strict";

/** global: puzzle */

/**
 * Framework specific classes. Extends the core classes to provide some basic
 * functionality in any application that might use this framework.
 *
 * @namespace puzzle
 */

const PEngine = require("../core/PEngine");

const puzzleInstance = new PEngine();

if (!global.puzzle) {
  /**
   * The global instance of the framework engine.
   *
   * Use 'puzzle' whenever you need some functionality from the application.
   *
   * @alias puzzle
   */
  global.puzzle = puzzleInstance;
}
if (!global.puzzleLight) {
  /**
   * The global instance of the framework engine.
   *
   * Use 'puzzle' whenever you need some functionality from the application.
   *
   * @alias puzzle
   */
  global.puzzleLight = true;
}

module.exports = puzzleInstance;
