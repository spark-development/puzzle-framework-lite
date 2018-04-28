"use strict";

const Puzzle = require("./index");
const PState = require("../core/PState");

class ModuleLoader extends PState {
  constructor() {
    super();

    this._modules = [];
    Puzzle.set("modules", this);
  }

  register(moduleName, moduleInstance) {

  }

  loadFromPacakge() {

  }
}

module.exports = ModuleLoader;
