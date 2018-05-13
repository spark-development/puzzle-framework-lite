"use strict";

const { expect } = require("chai");

const ConsoleBootstrap = require("../../src/cli/ConsoleBootstrap");

let originalPuzzle = null;

describe("ConsoleBootstrap class check", () => {
  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./puzzlecli");
    puzzle.cli.messages = [];
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("className should be ConsoleBootstrap", () => {
    const pobj = new ConsoleBootstrap();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("ConsoleBootstrap");
  });
  it("beforeBoot should register listeners for various events", () => {
    const pobj = new ConsoleBootstrap();

    const exitListeners = process.listenerCount("exit");
    const sigIntListeners = process.listenerCount("SIGINT");
    const exceptionListeners = process.listenerCount("uncaughtException");
    pobj.beforeBoot();
    expect(process.listenerCount("exit")).to.equal(exitListeners + 1);
    expect(process.listenerCount("SIGINT")).to.equal(sigIntListeners + 1);
    expect(process.listenerCount("uncaughtException")).to.equal(exceptionListeners + 1);
  });
  it("close without parameters shouldn't do anything", () => {
    const pobj = new ConsoleBootstrap();

    pobj.close();
    expect(true).to.be.true;
  });
  it("close with error parameter should log something", () => {
    const pobj = new ConsoleBootstrap();

    pobj.close({}, new Error("Something happened"));
    expect(true).to.be.true;
    expect(puzzle.cli.messages).to.deep.equal([
      "[error] Error: Something happened"
    ]);
  });
});
