"use strict";

const { expect } = require("chai");

let puzzle = null;

describe("puzzle class check", () => {
  let cwd = "";
  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
    puzzle = require("../../src/cmd");
  });
  after(() => {
    process.chdir(cwd);
  });

  it("puzzle should load express middlewares", () => {
    expect(puzzle).to.be.instanceOf(global.puzzle);
  });
});
