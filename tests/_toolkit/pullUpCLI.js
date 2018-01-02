"use strict";

/**
 * Hook that brings the CLI up.
 *
 * @alias test.hooks.pullUpCLI
 */
module.exports = () => {
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

  const Puzzle = require("../../src/cli");
  const puzzleInstance = Puzzle(require("./starter/test.json"));
  puzzleInstance.run();

  return puzzleInstance;
};
