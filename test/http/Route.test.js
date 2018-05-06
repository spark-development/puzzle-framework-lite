"use strict";

const {expect} = require("chai");

const Route = require("../../src/http/Route");

describe("Route class check", () => {
  it("className should be Route", () => {
    const pobj = new Route();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("Route");
  });
});
