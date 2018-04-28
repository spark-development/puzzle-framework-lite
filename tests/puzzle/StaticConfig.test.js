"use strict";

const {expect} = require("chai");
const path = require("path");

const StaticConfig = require("../../src/puzzle/StaticConfig");

describe("StaticConfig class check", () => {
  let cwd = '';
  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
  });
  after(() => {
    process.chdir(cwd);
  });

  it("initially the datastore should have some default data", () => {
    const pconfig = new StaticConfig();
    expect(pconfig.isEmpty).to.be.false;
    console.log(pconfig.engine);
    expect(pconfig.engine.debug).to.be.false;
  });
  it("init should load data", () => {
    const pconfig = new StaticConfig();
    expect(pconfig.isEmpty).to.be.false;
    expect(process.cwd()).to.equal(path.resolve(`${__dirname}/../_toolkit/starter`));
    expect(pconfig.engine.debug).to.be.false;
    pconfig.init();
    expect(pconfig.engine.debug).to.be.true;
    expect(pconfig.keys.length).to.equal(6);
    expect(pconfig.keys).to.deep.equal(["engine", "http", "i18n", "session", "socket", "views"]);
  });

});
