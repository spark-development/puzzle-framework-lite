"use strict";

const {expect} = require("chai");

const ConsoleBootstrap = require("../../src/cli/ConsoleBootstrap");

let originalPuzzle = null;

describe("ConsoleBootstrap class check", () => {
  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./puzzlecli");
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

    expect(process.listenerCount("exit")).to.equal(0);
    expect(process.listenerCount("SIGINT")).to.equal(1);
    expect(process.listenerCount("uncaughtException")).to.equal(1);
    pobj.beforeBoot();
    expect(process.listenerCount("exit")).to.equal(1);
    expect(process.listenerCount("SIGINT")).to.equal(2);
    expect(process.listenerCount("uncaughtException")).to.equal(2);
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
