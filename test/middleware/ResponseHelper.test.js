"use strict";

const { expect } = require("chai");

const ResponseHelper = require("../../src/middleware/ResponseHelper");

describe("ResponseHelper class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./middlewarePuzzle");
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("ResponseHelper should load express middlewares", () => {
    expect(ResponseHelper).to.be.instanceOf(Object);
  });
});
