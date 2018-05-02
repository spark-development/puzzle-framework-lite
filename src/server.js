"use strict";

const puzzle = require("./puzzleInit");
const HTTP = require("./http/HTTP");
const ServerBootstrap = require("./puzzle/ServerBootstrap");

puzzle.modules.loadFromPacakge();
puzzle.modules.register("ServerBootstrap", new ServerBootstrap());
puzzle.use(HTTP);
puzzle.use((engine) => {
  engine.set("boot", () => {
    engine.modules.boot();
    engine.modules.online();
  });
});

module.exports = puzzle;
