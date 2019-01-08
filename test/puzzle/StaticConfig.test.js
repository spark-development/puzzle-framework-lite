"use strict";

const { expect } = require("chai");
const path = require("path");

const StaticConfig = require("../../src/puzzle/StaticConfig");
const Engine = require("../../src/core/PEngine");

describe("StaticConfig class check", () => {
  let cwd = "";
  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
  });
  after(() => {
    process.chdir(cwd);
  });

  beforeEach(() => {
    const configResolve = require.resolve("../../src/defaults/config.js");
    if (require.cache[configResolve]) {
      delete require.cache[configResolve];
    }
  });

  it("initially the datastore should have some default data", () => {
    const pconfig = new StaticConfig();
    expect(pconfig.isEmpty).to.be.false;
    expect(pconfig.engine.debug).to.be.false;
  });
  it("init should load data", () => {
    const pconfig = new StaticConfig();
    expect(pconfig.isEmpty).to.be.false;
    expect(process.cwd()).to.equal(path.resolve(`${__dirname}/../_toolkit/starter`));
    expect(pconfig.engine.debug).to.be.false;
    pconfig.init();
    expect(pconfig.engine.debug).to.be.true;
    expect(pconfig.keys.length).to.equal(5);
    expect(pconfig.keys).to.deep.equal(["engine", "http", "i18n", "session", "views"]);
  });
  it("use should change the engine object", () => {
    const pconfig = new StaticConfig();
    const engine = new Engine();
    expect(process.cwd()).to.equal(path.resolve(`${__dirname}/../_toolkit/starter`));
    pconfig.use(engine);
    expect(engine.config.isEmpty).to.be.false;
    expect(engine.config.engine.debug).to.be.true;
    expect(engine.config.keys.length).to.equal(5);
    expect(engine.config.keys).to.deep.equal(["engine", "http", "i18n", "session", "views"]);
  });
});
