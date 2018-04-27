"use strict";

const { expect } = require("chai");

const engine  = require("../_toolkit/engine");
const Runtime = require("../_toolkit/Runtime.extend");

describe("Runtime class check", () => {
  const r = new Runtime(engine);
  it("className should be RuntimeExtend", () => {
    expect(r.className).to.be.a("string");
    expect(r.className).to.equal("RuntimeExtend");
  });
  it("Runtime should be initialized", () => {
    expect(r.objectInit).to.be.true;
    expect(r.objectRun).to.be.false;
  });
  it("Runtime.run() should set objectRun to true", () => {
    r.run();
    expect(r.objectInit).to.be.true;
    expect(r.objectRun).to.be.true;
  });
});
