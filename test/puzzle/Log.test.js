"use strict";

const {expect} = require("chai");

const Log = require("../../src/puzzle/Log");
let puzzle = null;

describe("Log class check", () => {
  let cwd = '';
  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
    puzzle = require("../../src/puzzleInit");
  });
  after(() => {
    process.chdir(cwd);
  });
  it("className should be Log", () => {
    const pobj = new Log();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("Log");
  });
});
