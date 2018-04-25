"use strict";

const ModuleLoader = require("./ModuleLoader");
const Puzzle = require("./Puzzle");
const Puzzles = require("./puzzles");
const Middleware = require("./middleware/Middleware");
const HTTPModule = require("./http/HTTP");
const RoutesLoader = require("./http/RoutesLoader");

/**
 * The engine core.
 *
 * @namespace engine
 */

/**
 * The engine core.
 *
 * @typedef {Object} engine
 */
const engine = {};

const puzzleInstance = new Puzzle(engine);

/**
 * Entry point for the framework.
 *
 * @alias PuzzleFramework
 *
 * @param {Object} packageJson The package.json file of the application.
 *
 * @return {Puzzle}
 */
module.exports = (packageJson) => {
  puzzleInstance.app = packageJson;

  /** Load the default Modules */
  const httpModule = new HTTPModule(engine);
  puzzleInstance.pushRuntime(Middleware);
  httpModule.middlewares();
  puzzleInstance.pushRuntime(RoutesLoader);

  Puzzles(puzzleInstance);
  puzzleInstance.pushRuntime(ModuleLoader);
  puzzleInstance.pushRuntime(httpModule);

  return puzzleInstance;
};
