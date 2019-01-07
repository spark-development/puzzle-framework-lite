"use strict";

const { expect } = require("chai");

const PEngine = require("../../src/core/PEngine");
const ModuleLoader = require("../../src/puzzle/ModuleLoader");
const PState = require("../../src/core/PState");
const InvalidInstanceType = require("../../src/exceptions/InvalidInstanceType");
const TestServerRuntime = require("./TestServerRuntime");
const TestCLIRuntime = require("../cli/TestCLIRuntime");
const TestRuntime = require("../core/TestRuntime");

let originalPuzzle = null;

describe("ModuleLoader class check", () => {
  let cwd = "";
  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./puzzlesrv");
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
  });
  after(() => {
    global.puzzle = originalPuzzle;
    process.chdir(cwd);
  });
  it("className should be ModuleLoader", () => {
    const pobj = new ModuleLoader();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("ModuleLoader");
    expect(pobj).to.be.instanceof(PState);
  });
  it("use register modules", () => {
    const pobj = new ModuleLoader();
    const engine = new PEngine();
    pobj.use(engine);
    expect(engine.modules).to.deep.equal(pobj);
  });
  it("boot should set state to BOOT", () => {
    const pobj = new ModuleLoader();
    expect(pobj.state).to.equal("");
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    expect(puzzle.log.messages).to.include("[debug] Run stage: beforeBoot");
    expect(puzzle.log.messages).to.include("[debug] Run stage: boot");
    expect(puzzle.log.messages).to.include("[debug] Run stage: afterBoot");
  });
  it("online should set state to ONLINE", () => {
    const pobj = new ModuleLoader();
    expect(pobj.state).to.equal("");
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.INVALID);
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.ONLINE);
    expect(puzzle.log.messages).to.include("[debug] Run stage: beforeOnline");
    expect(puzzle.log.messages).to.include("[debug] Run stage: online");
    expect(puzzle.log.messages).to.include("[debug] Run stage: afterOnline");
  });
  it("shutdown should set state to halt, from boot", () => {
    const pobj = new ModuleLoader();
    expect(pobj.state).to.equal("");
    pobj.shutdown();
    expect(pobj.state).to.equal(PState.STATES.INVALID);
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    pobj.shutdown();
    expect(pobj.state).to.equal(PState.STATES.HALT);
    expect(puzzle.log.messages).to.include("[debug] Run stage: beforeShutdown");
    expect(puzzle.log.messages).to.include("[debug] Run stage: shutdown");
    expect(puzzle.log.messages).to.include("[debug] Run stage: afterShutdown");
  });
  it("shutdown should set state to halt, from online", () => {
    const pobj = new ModuleLoader();
    expect(pobj.state).to.equal("");
    pobj.shutdown();
    expect(pobj.state).to.equal(PState.STATES.INVALID);
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.ONLINE);
    const originalAfter = pobj.afterShutdown;
    pobj.afterShutdown = function() {
      expect(pobj.state).to.equal(PState.STATES.SHUTDOWN);
      originalAfter.call(pobj);
    };
    pobj.shutdown();
    expect(pobj.state).to.equal(PState.STATES.HALT);
  });
  it("register should not register invalid modules", () => {
    const pobj = new ModuleLoader();
    expect(() => pobj.register("test", {})).to.throw(InvalidInstanceType);
    expect(() => pobj.register("test", null)).to.throw(InvalidInstanceType);
    expect(() => pobj.register("test", new PEngine())).to.throw(InvalidInstanceType);
  });
  it("register should register valid modules", () => {
    const pobj = new ModuleLoader();
    expect(() => pobj.register("server", new TestServerRuntime())).to.not.throw(InvalidInstanceType);
    expect(() => pobj.register("both", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(() => pobj.register("cli", new TestCLIRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(3);
  });
  it("register should override existing modules", () => {
    const pobj = new ModuleLoader();
    expect(() => pobj.register("server", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad[0].name).to.equal("server");
    expect(pobj._orderedLoad[0].instance.className).to.equal("TestRuntime");
    expect(pobj._orderedLoad[0].instance.className).to.not.equal("TestServerRuntime");
    expect(() => pobj.register("server", new TestServerRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad[0].name).to.equal("server");
    expect(pobj._orderedLoad[0].instance.className).to.not.equal("TestRuntime");
    expect(pobj._orderedLoad[0].instance.className).to.equal("TestServerRuntime");
    expect(pobj._orderedLoad.length).to.equal(1);
  });
  it("register should register only cli and general modules if puzzle.cli is available", () => {
    const pobj = new ModuleLoader();
    puzzle.cli = true;
    expect(() => pobj.register("server", new TestServerRuntime())).to.not.throw(InvalidInstanceType);
    expect(() => pobj.register("both", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(() => pobj.register("cli", new TestCLIRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(2);
    expect(pobj._modules.cli).to.not.be.undefined;
    expect(pobj._modules.both).to.not.be.undefined;
    expect(pobj._modules.server).to.be.undefined;
    delete puzzle.cli;
  });
  it("register should register only server and general modules if puzzle.http is available", () => {
    const pobj = new ModuleLoader();
    puzzle.http = true;
    expect(() => pobj.register("server", new TestServerRuntime())).to.not.throw(InvalidInstanceType);
    expect(() => pobj.register("both", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(() => pobj.register("cli", new TestCLIRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(2);
    expect(pobj._modules.server).to.not.be.undefined;
    expect(pobj._modules.both).to.not.be.undefined;
    expect(pobj._modules.cli).to.be.undefined;
    delete puzzle.http;
  });
  it("boot with modules should log something", () => {
    const pobj = new ModuleLoader();
    expect(() => pobj.register("both", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(1);
    expect(pobj.state).to.equal("");
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    expect(puzzle.log.messages).to.include("[debug] Run stage: beforeBoot");
    expect(puzzle.log.messages).to.include("[debug] Run stage: boot");
    expect(puzzle.log.messages).to.include("[debug] Run stage: [boot] for module: [both]");
    expect(puzzle.log.messages).to.include("[debug] Run stage: afterBoot");
  });
  it("online with modules should log something", () => {
    const pobj = new ModuleLoader();
    expect(() => pobj.register("both", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(1);
    expect(pobj.state).to.equal("");
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.INVALID);
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.ONLINE);
    expect(puzzle.log.messages).to.include("[debug] Run stage: beforeOnline");
    expect(puzzle.log.messages).to.include("[debug] Run stage: online");
    expect(puzzle.log.messages).to.include("[debug] Run stage: [online] for module: [both]");
    expect(puzzle.log.messages).to.include("[debug] Run stage: afterOnline");
  });
  it("shutdown with modules should log something", () => {
    const pobj = new ModuleLoader();
    expect(() => pobj.register("both", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(1);
    expect(pobj.state).to.equal("");
    pobj.shutdown();
    expect(pobj.state).to.equal(PState.STATES.INVALID);
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    pobj.shutdown();
    expect(pobj.state).to.equal(PState.STATES.HALT);
    expect(puzzle.log.messages).to.include("[debug] Run stage: beforeShutdown");
    expect(puzzle.log.messages).to.include("[debug] Run stage: shutdown");
    expect(puzzle.log.messages).to.include("[debug] Run stage: [shutdown] for module: [both]");
    expect(puzzle.log.messages).to.include("[debug] Run stage: afterShutdown");
  });
  it("register with state changed shouldn't add new modules", () => {
    const pobj = new ModuleLoader();
    expect(() => pobj.register("both", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(1);
    expect(pobj.state).to.equal("");
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.INVALID);
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
    expect(() => pobj.register("test", new TestRuntime())).to.not.throw(InvalidInstanceType);
    expect(pobj._orderedLoad.length).to.equal(1);
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.ONLINE);
    expect(puzzle.log.messages).to.include("[debug] Run stage: beforeOnline");
    expect(puzzle.log.messages).to.include("[debug] Run stage: online");
    expect(puzzle.log.messages).to.include("[debug] Run stage: [online] for module: [both]");
    expect(puzzle.log.messages).to.not.include("[debug] Run stage: [online] for module: [test]");
    expect(puzzle.log.messages).to.include("[debug] Run stage: afterOnline");
  });

  it("load the modules defined in package.json", () => {
    puzzle.app.modules = [
      "recursive.module.in.folder",
      "sample.test"
    ];
    puzzle.log.messages = [];
    const pobj = new ModuleLoader();
    pobj.loadFromPackage();

    expect(puzzle.log.messages).to.include("[debug] Loading module: [recursive.module.in.folder].");
    expect(puzzle.log.messages).to.include("[debug] Loading module: [sample.test].");
    expect(puzzle.log.messages).to.not.include("[error] Unable to load module [sample.test].");
    expect(puzzle.log.messages).to.not.include("[error] Unable to load module [recursive.in.folder].");

    puzzle.app.modules = [];
  });

  it("load the existing and inexisting modules from package.json", () => {
    puzzle.app.modules = [
      "recursive.in.folder",
      "sample.test"
    ];
    puzzle.log.messages = [];
    const pobj = new ModuleLoader();
    pobj.loadFromPackage();

    expect(puzzle.log.messages).to.include("[debug] Loading module: [recursive.in.folder].");
    expect(puzzle.log.messages).to.include("[debug] Loading module: [sample.test].");
    expect(puzzle.log.messages).to.not.include("[error] Unable to load module [sample.test].");
    expect(puzzle.log.messages).to.include("[error] Unable to load module [recursive.in.folder].");

    puzzle.app.modules = [];
  });
});
