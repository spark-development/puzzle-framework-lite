"use strict";

const {expect} = require("chai");

const ServerBootstrap = require("../../src/puzzle/ServerBootstrap");

describe("ServerBootstrap class check", () => {
  it("className should be ServerBootstrap", () => {
    const pobj = new ServerBootstrap();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("ServerBootstrap");
  });
});
