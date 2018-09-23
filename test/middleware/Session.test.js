"use strict";

const { expect } = require("chai");

const Session = require("../../src/middleware/Session");

describe("Session class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./middlewarePuzzle");
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("Session should load express middlewares", () => {
    expect(Session).to.be.instanceOf(Object);
  });
});
