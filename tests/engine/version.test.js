"use strict";

const expect = require("chai").expect;

const pullUp = require("../_toolkit/pullUp");
const pullDown = require("../_toolkit/pullDown");

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
  it("should be 1.2.0", (done) => {
    expect(engine.version.version).to.be.a("string");
    expect(engine.version.version).to.equal("1.2.0");
    done();
  });
});