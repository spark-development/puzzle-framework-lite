"use strict";

const {expect} = require("chai");

const ConsoleBootstrap = require("../../src/puzzle/ConsoleBootstrap");

describe("ConsoleBootstrap class check", () => {
  it("className should be ConsoleBootstrap", () => {
    const pobj = new ConsoleBootstrap();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("ConsoleBootstrap");
  });
});
