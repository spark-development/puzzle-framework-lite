"use strict";

const {expect} = require("chai");

const Log = require("../../src/puzzle/Log");

describe("Log class check", () => {
  it("className should be Log", () => {
    const pobj = new Log();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("Log");
  });
});
