"use strict";

const cli = require("cli");

const Middleware = require("../middleware/Middleware");
const ModelsLoader = require("../models");
const ModuleLoader = require("../ModuleLoader");
const Puzzles = require("../puzzles");
const RoutesLoader = require("../http/RoutesLoader");

const HTTPDummy = require("./HTTPDummy");
const Puzzle = require("./PuzzleCLI");

/**
 * CLI framework namespace.
 *
 * @namespace cli
 */

const engine = {};

/**
 * CLI engine reference.
 *
 * @memberOf engine
 * @type {cli}
 * @see {@link https://www.npmjs.com/package/cli}
 */
engine.cli = cli;

const puzzleInstance = new Puzzle(engine);
cli.enable("version", "status");
cli.setApp("Puzzle Framework CLI", engine.version.version);

/**
 * Entry point for the CLI Framework.
 *
 * @alias PuzzleCLIFramework
 *
 * @param {Object} packageJson The package.json file of the application.
 *
 * @return {Puzzle}
 */
module.exports = (packageJson) => {
  puzzleInstance.app = packageJson;

  /** Load the default Modules */
  puzzleInstance.pushRuntime(HTTPDummy);
  puzzleInstance.pushRuntime(Middleware);
  puzzleInstance.pushRuntime(ModelsLoader);
  puzzleInstance.pushRuntime(RoutesLoader);
  require("./i18n")(engine);

  Puzzles(puzzleInstance);
  puzzleInstance.pushRuntime(ModuleLoader);

  return puzzleInstance;
};
