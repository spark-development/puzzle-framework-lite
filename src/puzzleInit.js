"use strict";

const puzzle = require("./puzzle");

const ModuleLoader = require("./puzzle/ModuleLoader");
const StaticConfig = require("./puzzle/StaticConfig");

puzzle.use(StaticConfig);
puzzle.use(ModuleLoader);

module.exports = puzzle;
