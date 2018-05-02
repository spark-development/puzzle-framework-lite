"use strict";

/**
 * Framework specific classes. Extends the core classes to provide some basic
 * functionality in any application that might use this framework.
 *
 * @namespace puzzle
 */

const PEngine = require("../core/PEngine");
const puzzleInstance = new PEngine();

if (global.puzzle === null || global.puzzle === undefined) {
  /**
   * Global puzzle instance.
   *
   * @alias puzzle
   */
  global.puzzle = puzzleInstance;
}

module.exports = puzzleInstance;
