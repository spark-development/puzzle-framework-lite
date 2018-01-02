"use strict";

const _ = require("lodash");

/**
 * Hook that brings the server up.
 *
 * @alias test.hooks.pullUp
 */
module.exports = (configChange) => {
  if (!process.cwd().endsWith("/tests/_toolkit/starter")) {
    process.chdir(`${process.cwd()}/tests/_toolkit/starter`);
  }

  if (!process.cwd().endsWith("/_toolkit/starter")) {
    process.chdir(`${process.cwd()}/_toolkit/starter`);
  }

  if (!process.cwd().endsWith("/starter")) {
    process.chdir(`${process.cwd()}/starter`);
  }

  delete require.cache[require.resolve('../../src/index')];
  delete require.cache[require.resolve('./starter/test.json')];

  const Puzzle = require("../../src/index");
  const PuzzleConfig = require("./starter/test.json");
  if(configChange !== undefined && configChange !== null) {
    _.merge(PuzzleConfig.puzzle, configChange);
  }
  const puzzleInstance = Puzzle(PuzzleConfig);
  puzzleInstance.run();

  return puzzleInstance;
};
