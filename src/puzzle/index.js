"use strict";

/**
 * Framework specific classes. Extends the core classes to provide some basic
 * functionality in any application that might use this framework.
 *
 * @namespace puzzle
 */

const Puzzle = require("./Puzzle");
const puzzleInstance = new Puzzle();

if (global.puzzle === null || global.puzzle === undefined) {
  /**
   * Global puzzle instance.
   *
   * @alias puzzle
   */
  global.puzzle = puzzleInstance;
}

module.exports = puzzleInstance;
