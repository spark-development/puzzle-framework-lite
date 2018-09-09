"use strict";

/**
 * Entry point of the Console application.
 *
 * @module cmd
 */

const puzzle = require("./puzzleInit");
const ConsoleBootstrap = require("./cli/ConsoleBootstrap");
const CommandLoader = require("./cli/CommandLoader");
const Log = require("./cli/Log");
const i18n = require("./middleware/i18n");

puzzle.modules.register("ConsoleBootstrap", new ConsoleBootstrap());
puzzle.use(Log);
puzzle.use(i18n);
puzzle.use(CommandLoader);
puzzle.use((engine) => {
  engine.set("boot", async () => {
    let code = 0;
    try {
      engine.modules.loadFromPackage();
      engine.modules.boot();
      engine.modules.online();
      await engine.commands.run();
      engine.modules.shutdown();
    } catch (e) {
      code = e.code || 1;
    }
    process.exit(code);
  });
  engine.set("shutdown", () => {
    engine.modules.shutdown();
  });
});

module.exports = puzzle;
