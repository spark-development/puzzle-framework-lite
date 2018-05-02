"use strict";

const puzzle = require("./puzzle");

const ModuleLoader = require("./puzzle/ModuleLoader");
const StaticConfig = require("./puzzle/StaticConfig");
const Log = require("./puzzle/Log");

puzzle.use(StaticConfig);
puzzle.use(Log);
puzzle.use(ModuleLoader);

module.exports = puzzle;
