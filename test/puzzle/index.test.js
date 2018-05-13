"use strict";

const { expect } = require("chai");
const PEngine = require("../../src/core/PEngine");

describe("puzzle global loading check", () => {
  before(() => {
    global.puzzle = null;
  });
  it("index should register puzzle globally", () => {
    expect(puzzle).to.be.null;
    expect(global.puzzle).to.be.null;
    delete require.cache[require.resolve("../../src/puzzle")];
    const localPuzzle = require("../../src/puzzle");
    expect(puzzle).to.not.be.null;
    expect(global.puzzle).to.not.be.null;
    expect(puzzle).to.deep.equal(localPuzzle);
  });
  it("index should register puzzle globally after puzzle was deleted", () => {
    expect(global.puzzle).to.not.be.null;
    delete global.puzzle;
    expect(global.puzzle).to.be.undefined;
    delete require.cache[require.resolve("../../src/puzzle")];
    const localPuzzle = require("../../src/puzzle");
    expect(global.puzzle).to.not.be.null;
    expect(global.puzzle).to.not.be.undefined;
    expect(global.puzzle).to.deep.equal(localPuzzle);
  });
  it("puzzle should be instance of PEngine", () => {
    expect(puzzle).to.be.instanceOf(PEngine);
  });
});
