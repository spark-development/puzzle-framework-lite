"use strict";

const { expect } = require("chai");
const PObject = require("../../src/base/PObject");

describe("PObject class check", () => {
  it("className should be PObject", () => {
    const pobj = new PObject();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("PObject");
  });
});
