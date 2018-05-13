"use strict";

const { expect } = require("chai");

const Log = require("../../src/puzzle/Log");

describe("Log class check", () => {
  let cwd = "";
  let originalPuzzle = null;

  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
    originalPuzzle = global.puzzle;
    global.puzzle = require("../../src/puzzleInit");
  });

  after(() => {
    global.puzzle = originalPuzzle;
    process.chdir(cwd);
  });

  it("className should be Log", () => {
    const pobj = new Log();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("Log");
  });
});
