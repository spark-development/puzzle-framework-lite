"use strict";

const expect = require("chai").expect;
const PBase = require("../../src/base/PBase");

describe("PBase class check", () => {
  it("className should be PBase", () => {
    const pobj = new PBase();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("PBase");
  });
  it("isValid should work in PBase", () => {
    const pobj = new PBase();
    let x;
    expect(pobj.isValid(null)).to.be.false;
    expect(pobj.isValid(x)).to.be.false;
    expect(pobj.isValid("Pbase")).to.be.true;
  });
});
