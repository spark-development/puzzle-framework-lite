"use strict";

const {expect} = require("chai");

const RoutesLoader = require("../../src/http/RoutesLoader");

describe("RoutesLoader class check", () => {
  it("className should be RoutesLoader", () => {
    const pobj = new RoutesLoader();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("RoutesLoader");
  });
});
