"use strict";

const {expect} = require("chai");

const HTTP = require("../../src/http/HTTP");

describe("HTTP class check", () => {
  it("className should be HTTP", () => {
    const pobj = new HTTP();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("HTTP");
  });
});
