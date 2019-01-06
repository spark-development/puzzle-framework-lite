"use strict";

const { expect } = require("chai");

const bundle = require("../../src/utils/bundle");
let originalPuzzle = null;

describe("PSealEnum class check", () => {
  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = {
      modules: {
        modules: {},
        register(module, moduleInstance) {
          this.modules[module] = moduleInstance;
        }
      }
    };
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  beforeEach(() => {
    puzzle.modules.modules = {};
  });

  it("bundle should bundle modules", () => {
    expect(Object.keys(puzzle.modules.modules).length)
      .to
      .equal(0);
    bundle("test", function() { this.testMethod = () => "Test Message"; return this; });
    expect(Object.keys(puzzle.modules.modules).length)
      .to
      .equal(1);
    expect(puzzle.modules.modules.test.testMethod())
      .to
      .equal("Test Message");

  });
});
