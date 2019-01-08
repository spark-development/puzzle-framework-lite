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

  beforeEach(() => {
    puzzle.http.middleware = false;
    delete puzzle.http.req.session;
  });

  it("Session should load express middlewares", () => {
    expect(Session).to.be.instanceOf(Object);
    Session();

    expect(puzzle.http.middleware).to.be.true;
    expect(puzzle.http.req.session).to.not.be.null;
  });

  it("Session set to anything else than memory should not register anything", () => {
    expect(Session).to.be.instanceOf(Object);
    puzzle.config.session.store = "RandomThing";
    Session();

    expect(puzzle.http.middleware).to.not.true;
    expect(puzzle.http.req.session).to.be.undefined;
  });
});
