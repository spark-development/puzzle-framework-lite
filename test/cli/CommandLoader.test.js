"use strict";

const {expect} = require("chai");

const CommandLoader = require("../../src/cli/CommandLoader");

describe("CommandLoader class check", () => {
  it("className should be CommandLoader", () => {
    const pobj = new CommandLoader();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("CommandLoader");
  });
});
