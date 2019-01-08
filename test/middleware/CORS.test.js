"use strict";

const { expect } = require("chai");

const cors = require("../../src/middleware/CORS");

describe("cors class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./middlewarePuzzle");
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  beforeEach(() => {
    puzzle.http.middleware = false;
  });

  it("cors should load express middlewares", () => {
    expect(cors).to.be.instanceOf(Object);

    cors();
    expect(puzzle.http.middleware).to.be.true;
  });
});
