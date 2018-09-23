"use strict";

const { expect } = require("chai");

const BodyParser = require("../../src/middleware/BodyParser");

describe("BodyParser class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./middlewarePuzzle");
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("BodyParser should load express middlewares", () => {
    expect(BodyParser).to.be.instanceOf(Object);
  });
});
