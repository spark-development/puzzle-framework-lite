"use strict";

const { expect } = require("chai");

const InMemoryLog = require("./InMemoryLog");

describe("PLog class check", () => {
  it("logger shouldn't be null", () => {
    const pobj = new InMemoryLog();

    expect(pobj._logger).to.not.be.null;
  });
  it("logLevel should be test", () => {
    const pobj = new InMemoryLog();

    expect(pobj.logLevel).to.not.be.equal("");
    expect(pobj.logLevel).to.be.equal("test");
  });
  it("logger should accept a logger class", () => {
    const pobj = new InMemoryLog();
    expect(pobj._logger).to.not.be.null;
    pobj.debug("test 1");
    pobj.info("test 2");
    pobj._logger.info("test 3");
    expect(pobj.size).to.equal(3);
    expect(pobj.text).to.deep.equal(["[DEBUG] test 1", "[INFO] test 2", "[INFO] test 3"]);
  });
  it("use should append log to engine", () => {
    const pobj = new InMemoryLog();
    expect(pobj._logger).to.not.be.null;
    const engine = {};
    pobj.use(engine);
    expect(engine.log).to.not.be.null;
    expect(engine.log).to.deep.equal(pobj);
    pobj.debug("test 1");
    engine.log.info("test 2");
    pobj._logger.info("test 3");
    expect(engine.log.size).to.equal(3);
    expect(engine.log.text).to.deep.equal(["[DEBUG] test 1", "[INFO] test 2", "[INFO] test 3"]);
  });
});
