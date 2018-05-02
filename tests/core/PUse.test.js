"use strict";

const { expect } = require("chai");

const packageJson = require("../../package.json");
const PUse = require("../../src/core/PUse");

describe("PUse class check", () => {
  it("PUse.use shouldn't do anything", () => {
    const pobj = new PUse();
    const engine = {};
    pobj.use(engine);
    expect(engine).to.deep.equal({});
  });
});
