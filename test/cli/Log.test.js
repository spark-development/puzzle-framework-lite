"use strict";

const { expect } = require("chai");

const Log = require("../../src/cli/Log");

describe("CLI Log class check", () => {
  it("logger shouldn't be null", () => {
    const pobj = new Log();

    expect(pobj._logger).to.not.be.null;
  });
  it("logLevel should be empty", () => {
    const pobj = new Log();

    expect(pobj.logLevel).to.be.equal("");
  });
  it("use should append log to engine", () => {
    const pobj = new Log();
    expect(pobj._logger).to.not.be.null;
    const engine = {};
    pobj.use(engine);
    expect(engine.log).to.not.be.null;
    expect(engine.log).to.deep.equal(pobj);
  });
  it("logging methods should do nothing", () => {
    const pobj = new Log();
    expect(pobj.logger.emergency()).to.equal("");
    expect(pobj.logger.alert()).to.equal("");
    expect(pobj.logger.critical()).to.equal("");
    expect(pobj.logger.error()).to.equal("");
    expect(pobj.logger.warning()).to.equal("");
    expect(pobj.logger.notice()).to.equal("");
    expect(pobj.logger.info()).to.equal("");
    expect(pobj.logger.debug()).to.equal("");
  });
});
