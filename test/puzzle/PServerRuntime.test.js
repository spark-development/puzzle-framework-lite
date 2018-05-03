"use strict";

const { expect } = require("chai");

const PServerRuntime = require("../../src/puzzle/PServerRuntime");

describe("PServerRuntime class check", () => {
  it("cli should be false and http should be true", () => {
    const pobj = new PServerRuntime();
    expect(pobj.httpOnly).to.be.true;
    expect(pobj.cliOnly).to.be.false;
  });
  it("cli and http only shouldn't be updateable", () => {
    const pobj = new PServerRuntime();
    expect(() => (pobj.httpOnly = true)).to.throw();
    expect(() => (pobj.cliOnly = true)).to.throw();
  });
});
