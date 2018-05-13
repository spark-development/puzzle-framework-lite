"use strict";

const { expect } = require("chai");

const Log = require("../../src/puzzle/Log");

describe("Log class check", () => {
  let cwd = "";
  let originalPuzzle = null;

  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
    originalPuzzle = global.puzzle;
    delete require.cache[require.resolve("../../src/puzzleInit")];
    global.puzzle = require("../../src/puzzleInit");
    puzzle.config.engine.debug = false;
  });

  after(() => {
    puzzle.log = {
      debug() {
      }
    };
    puzzle.modules.shutdown();
    global.puzzle = originalPuzzle;
    process.chdir(cwd);
  });

  it("logLevel shouldn't be debug", () => {
    const pobj = new Log();
    expect(pobj.logLevel).to.be.equal("info");
  });
  it("logLevel should be debug", () => {
    puzzle.config.engine.debug = true;
    const pobj = new Log();
    expect(pobj.logLevel).to.be.equal("debug");
  });
  it("logLevel can be changed by initlog", () => {
    const pobj = new Log();
    expect(pobj.logLevel).to.be.equal("debug");
    pobj.initLog("error");
    expect(pobj.logLevel).to.not.be.equal("debug");
    expect(pobj.logLevel).to.be.equal("error");
  });
  it("logLevel can be changed by initlog", () => {
    const pobj = new Log();
    expect(pobj.logLevel).to.be.equal("debug");
    pobj.initLog("error");
    expect(pobj.logLevel).to.not.be.equal("debug");
    expect(pobj.logLevel).to.be.equal("error");
  });
  it("initLog cannot take invalid values and change loglevel", () => {
    const pobj = new Log();
    expect(pobj.logLevel).to.be.equal("debug");
    pobj.initLog({});
    expect(pobj.logLevel).to.be.equal("debug");
    pobj.initLog(null);
    expect(pobj.logLevel).to.be.equal("debug");
    pobj.initLog(123);
    expect(pobj.logLevel).to.be.equal("debug");
    pobj.initLog(false);
    expect(pobj.logLevel).to.be.equal("debug");
    pobj.initLog("test");
    expect(pobj.logLevel).to.be.equal("info");
  });
  it("initLog with console logger", () => {
      const initialConfig = Object.assign({}, puzzle.config.engine.log);
      puzzle.config.engine.log.file = "";
      const pobj = new Log();
      expect(pobj.logger.stream).to.deep.equal(process.stdout);
      puzzle.config.engine.log = Object.assign({}, initialConfig);
  });

  // TODO: Fix this part
  // it("test file rotation", (done) => {
  //   const initialConfig = Object.assign({}, puzzle.config.engine.log);
  //   puzzle.config.engine.log.file = "logs/rotation.log";
  //   puzzle.config.engine.log.size = "5k";
  //   puzzle.config.engine.log.schedule = "1s";
  //   puzzle.config.engine.log.compress = false;
  //   const rotationLog = path.resolve(`${__dirname}/../_toolkit/starter/logs/rotation.log`);
  //   const rotationLog2 = path.resolve(`${__dirname}/../_toolkit/starter/logs/rotation.log.2`);
  //
  //   const pobj = new Log();
  //   pobj.logger.info(".".repeat(6000));
  //   expect(fs.existsSync(rotationLog)).to.be.true;
  //   puzzle.config.engine.log = Object.assign({}, initialConfig);
  //   setTimeout(() => {
  //     pobj.logger.info(".".repeat(4000));
  //     expect(fs.existsSync(rotationLog)).to.be.true;
  //     expect(fs.existsSync(rotationLog2)).to.be.true;
  //     expect(fs.statSync(rotationLog).size).to.be.below(5000);
  //     expect(fs.statSync(rotationLog2).size).to.be.above(5000);
  //     fs.unlinkSync(rotationLog);
  //     fs.unlinkSync(rotationLog2);
  //     expect(fs.existsSync(rotationLog)).to.be.false;
  //     expect(fs.existsSync(rotationLog2)).to.be.false;
  //     done();
  //   }, 2000);
  // });
});
