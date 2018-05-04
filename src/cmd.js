"use strict";

const puzzle = require("./puzzleInit");
const ConsoleBootstrap = require("./puzzle/ConsoleBootstrap");
const CommandLoader = require("./cli/CommandLoader");
const Log = require("./cli/Log");

puzzle.modules.register("ConsoleBootstrap", new ConsoleBootstrap());
puzzle.use(Log);
puzzle.use(CommandLoader);
puzzle.use((engine) => {
  engine.set("boot", async () => {
    let code = 0;
    try {
      engine.modules.loadFromPacakge();
      engine.modules.boot();
      engine.modules.online();
      await engine.commands.run();
      engine.modules.shutdown();
    } catch (e) {
      code = e.code || 1;
    }
    process.exit(code);
  });
});

module.exports = puzzle;
