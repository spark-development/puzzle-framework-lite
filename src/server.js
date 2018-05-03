"use strict";

const puzzle = require("./puzzleInit");
const HTTP = require("./http/HTTP");
const RoutesLoader = require("./http/RoutesLoader");
const ServerBootstrap = require("./puzzle/ServerBootstrap");
const SocketIO = require("./SocketIO");
const UI = require("./UI");
const Log = require("./puzzle/Log");

puzzle.use(Log);
puzzle.modules.register("ServerBootstrap", new ServerBootstrap());
puzzle.use(HTTP);
puzzle.use(RoutesLoader);
puzzle.use(SocketIO);
puzzle.use(UI);
puzzle.use((engine) => {
  engine.set("boot", () => {
    engine.modules.loadFromPacakge();
    engine.modules.boot();
    engine.modules.online();
  });
});

module.exports = puzzle;
