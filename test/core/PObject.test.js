"use strict";

const { expect } = require("chai");
const PObject = require("../../src/core/PObject");

describe("PObject class check", () => {
  it("className should be PObject", () => {
    const pobj = new PObject();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("PObject");
  });
  it("isValid should work in PObject", () => {
    const pobj = new PObject();
    let x;
    expect(pobj.isValid(null)).to.be.false;
    expect(pobj.isValid(x)).to.be.false;
    expect(pobj.isValid("Pobject")).to.be.true;
  });
});
