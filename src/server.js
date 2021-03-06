"use strict";

/**
 * Entry point of the server application.
 *
 * @module server
 */

const puzzle = require("./puzzleInit");
const HTTP = require("./http/HTTP");
const RoutesLoader = require("./http/RoutesLoader");
const ServerBootstrap = require("./puzzle/ServerBootstrap");
const UI = require("./ui");
const Log = require("./puzzle/Log");

puzzle.use(Log);
puzzle.modules.register("ServerBootstrap", new ServerBootstrap());
puzzle.use(HTTP);
puzzle.use(RoutesLoader);
puzzle.use(UI);
puzzle.use((engine) => {
  engine.set("boot", () => {
    engine.modules.loadFromPackage();
    engine.modules.boot();
    engine.modules.online();
  });
  engine.set("shutdown", () => {
    engine.modules.shutdown();
  });
});

module.exports = puzzle;
