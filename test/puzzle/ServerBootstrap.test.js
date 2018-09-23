"use strict";

const { expect } = require("chai");

const ServerBootstrap = require("../../src/puzzle/ServerBootstrap");
const Logger = require("../core/InMemoryLog");

let originalPuzzle = null;
let cwd = "";

describe("ServerBootstrap class check", () => {
  const logger = new Logger();

  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
    originalPuzzle = global.puzzle;
    delete require.cache[require.resolve("../../src/puzzleInit")];
    global.puzzle = require("../../src/puzzleInit");
    logger.use(puzzle);
  });

  after(() => {
    puzzle.modules.shutdown();
    global.puzzle = originalPuzzle;
    process.chdir(cwd);
  });

  beforeEach(() => {
    logger._messages = [];
  });

  it("className should be ServerBootstrap", () => {
    const pobj = new ServerBootstrap();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("ServerBootstrap");
  });
  it("beforeBoot should register listeners for various events", () => {
    const pobj = new ServerBootstrap();

    const exitListeners = process.listenerCount("exit");
    const sigIntListeners = process.listenerCount("SIGINT");
    const exceptionListeners = process.listenerCount("uncaughtException");
    pobj.beforeBoot();
    const result = [
      "[INFO] Application started",
      `[INFO] ${"-".repeat(30)}`,
      `[INFO] Puzzle Framework Version: ${puzzle.app.version}`,
      `[INFO] Framework type: Lite`,
      `[INFO] Environment: ${puzzle.env}`,
      "[INFO] Logging level: test",
      `[INFO] ${"-".repeat(30)}`
    ];
    expect(logger._messages).to.deep.equal(result);
    expect(process.listenerCount("exit")).to.equal(exitListeners + 1);
    expect(process.listenerCount("SIGINT")).to.equal(sigIntListeners + 1);
    expect(process.listenerCount("uncaughtException")).to.equal(exceptionListeners + 1);
    process.removeAllListeners("exit");
    process.removeAllListeners("SIGINT");
    process.removeAllListeners("uncaughtException");
  });
  it("close without parameters shouldn't do anything", () => {
    const pobj = new ServerBootstrap();

    pobj.close();
    expect(true).to.be.true;
  });
  it("close with error parameter should log something", () => {
    const pobj = new ServerBootstrap();

    pobj.close({}, new Error("Something happened"));
    expect(true).to.be.true;
    const result = [
      "[DEBUG] Run stage: beforeShutdown",
      "[DEBUG] Finalized stage: beforeShutdown",
      "[DEBUG] Run stage: shutdown",
      "[DEBUG] Finalized stage: shutdown",
      "[DEBUG] Run stage: afterShutdown",
      "[DEBUG] Finalized stage: afterShutdown",
      "[ERROR] Error: Something happened",
      "[INFO] Application closed",
    ];
    expect(logger._messages).to.deep.equal(result);
  });
  it("shutdown without server shouldn't log anything", () => {
    const pobj = new ServerBootstrap();

    pobj.shutdown();
    expect(true).to.be.true;
    expect(logger._messages).to.deep.equal([]);
  });
  it("shutdown with server should log HTTP server shutdown", () => {
    const pobj = new ServerBootstrap();
    puzzle.server = {
      close() {
      }
    };

    pobj.shutdown();
    expect(true).to.be.true;
    const result = [
      "[INFO] Shutting down the HTTP server",
    ];
    expect(logger._messages).to.deep.equal(result);
    delete puzzle.server;
  });
});
