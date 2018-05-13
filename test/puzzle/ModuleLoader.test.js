"use strict";

const { expect } = require("chai");

const ModuleLoader = require("../../src/puzzle/ModuleLoader");
const PState = require("../../src/core/PState");

describe("ModuleLoader class check", () => {
  it("className should be ModuleLoader", () => {
    const pobj = new ModuleLoader();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("ModuleLoader");
    expect(pobj).to.be.instanceof(PState);
  });
});
