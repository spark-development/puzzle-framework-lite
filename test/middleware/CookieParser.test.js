"use strict";

const { expect } = require("chai");

const CookieParser = require("../../src/middleware/CookieParser");

describe("CookieParser class check", () => {
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

  it("CookieParser should load express middlewares", () => {
    expect(CookieParser).to.be.instanceOf(Object);

    CookieParser();
    expect(puzzle.http.middleware).to.be.true;
    expect(puzzle.http.req.cookies).to.not.be.null;
  });
});
