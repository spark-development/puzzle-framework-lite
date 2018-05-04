"use strict";

const { expect } = require("chai");

const pullUp = require("./pullUp");
const pullDown = require("./pullDown");

describe("version check", () => {
  let puzzle;
  let engine;

  before(() => {
    puzzle = pullUp();
    engine = puzzle.engine;
  });

  after(() => {
    pullDown(puzzle);
  });
  it("should be 1.0.0", (done) => {
    expect(engine.version.version).to.be.a("string");
    expect(engine.version.version).to.equal("1.0.0");
    done();
  });
});