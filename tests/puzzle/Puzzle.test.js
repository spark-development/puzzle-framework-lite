"use strict";

const {expect} = require("chai");

const Puzzle = require("../../src/puzzle/Puzzle");
const PEngine = require("../../src/core/PEngine");

describe("Puzzle class check", () => {
  it("className should be Puzzle", () => {
    const pobj = new Puzzle();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("Puzzle");
    expect(pobj).to.be.instanceof(PEngine);
  });
});
