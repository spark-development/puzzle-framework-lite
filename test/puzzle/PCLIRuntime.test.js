"use strict";

const { expect } = require("chai");

const PCLIRuntime = require("../../src/puzzle/PCLIRuntime");

describe("PCLIRuntime class check", () => {
  it("cli should be true and http should be false", () => {
    const pobj = new PCLIRuntime();
    expect(pobj.httpOnly).to.be.false;
    expect(pobj.cliOnly).to.be.true;
  });
  it("cli and http only shouldn't be updateable", () => {
    const pobj = new PCLIRuntime();
    expect(() => (pobj.httpOnly = true)).to.throw();
    expect(() => (pobj.cliOnly = true)).to.throw();
  });
});
