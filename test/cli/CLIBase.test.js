"use strict";

const { expect } = require("chai");

const CLITest = require("./commands/CLITest");
const CLITestNoOverride = require("./commands/CLITestNoOverride");

let originalPuzzle = null;

describe("CLITest class check", () => {
  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./puzzlecli");
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  beforeEach(() => {
    puzzle.cli.exitCode = 0;
    puzzle.cli.shouldExit = false;
    puzzle.cli.messages = [];
  });

  it("className should be CLITest", () => {
    const pobj = new CLITest();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("CLITest");
  });
  it("name should be clitest", () => {
    const pobj = new CLITest();
    expect(pobj.name).to.be.a("string");
    expect(pobj.name).to.equal("clitest");
  });
  it("options should be a map", () => {
    const pobj = new CLITest();
    expect(pobj.options).to.be.a("object");
    expect(pobj.options).to.deep.equal({
      test: [
        "test"
      ]
    });
  });
  it("CLITest should be able to run some code", () => {
    const pobj = new CLITest();
    expect(pobj.runArgs).to.not.be.undefined;
    expect(pobj.runOptions).to.not.be.undefined;
    expect(pobj.runArgs).to.deep.equal([]);
    expect(pobj.runOptions).to.deep.equal({});
    pobj.run();
    expect(pobj.runArgs).to.be.undefined;
    expect(pobj.runOptions).to.be.undefined;
    pobj.run(["test"], { test: true, test2: 123 });
    expect(pobj.runArgs).to.not.be.undefined;
    expect(pobj.runOptions).to.not.be.undefined;
    expect(pobj.runArgs).to.deep.equal(["test"]);
    expect(pobj.runOptions).to.deep.equal({ test: true, test2: 123 });
    expect(puzzle.cli.messages).to.deep.equal([]);
  });
  it("CLITest should be able to run usage code", () => {
    const pobj = new CLITest();
    pobj.usage();
    expect(puzzle.cli.messages).to.deep.equal([
      "[ok] TRANSLATED: Usage entry",
    ]);
  });
  it("CLITestNoOverride should be able to run some existing code", () => {
    const pobj = new CLITestNoOverride();
    expect(pobj.runArgs).to.not.be.undefined;
    expect(pobj.runOptions).to.not.be.undefined;
    expect(pobj.runArgs).to.deep.equal([]);
    expect(pobj.runOptions).to.deep.equal({});
    pobj.run();
    expect(pobj.runArgs).to.not.be.undefined;
    expect(pobj.runOptions).to.not.be.undefined;
    expect(pobj.runArgs).to.deep.equal([]);
    expect(pobj.runOptions).to.deep.equal({});
    pobj.run(["test"], { test: true, test2: 123 });
    expect(pobj.runArgs).to.not.be.undefined;
    expect(pobj.runOptions).to.not.be.undefined;
    expect(pobj.runArgs).to.deep.equal([]);
    expect(pobj.runOptions).to.deep.equal({});
    expect(puzzle.cli.messages).to.deep.equal([
      "[info] TRANSLATED: We've got:",
      "[info] TRANSLATED: ",
      "[info] TRANSLATED: [object Object]",
      "[info] TRANSLATED: We've got:",
      "[info] TRANSLATED: test",
      "[info] TRANSLATED: [object Object]"
    ]);
  });
  it("CLITestNoOverride should be able to run existing usage code", () => {
    const pobj = new CLITestNoOverride();
    pobj.usage();
    expect(puzzle.cli.messages).to.deep.equal([
      "[info] TRANSLATED: We currently have no usage for this command!",
    ]);
  });
  it("CLITest should be able to log some translated messages to CLI", () => {
    const pobj = new CLITest();
    pobj.put.debug("Debug Message");
    pobj.put.info("Info Message");
    pobj.put.error("Error Message");
    pobj.put.fatal("Fatal Message");
    pobj.put.ok("OK Message");

    expect(puzzle.cli.messages).to.deep.equal([
      "[debug] TRANSLATED: Debug Message",
      "[info] TRANSLATED: Info Message",
      "[error] TRANSLATED: Error Message",
      "[fatal] TRANSLATED: Fatal Message",
      "[ok] TRANSLATED: OK Message"
    ]);
  });
  it("CLITest should be able to log some untranslated messages to CLI", () => {
    const pobj = new CLITest();
    pobj.putU.debug("Debug Message");
    pobj.putU.info("Info Message");
    pobj.putU.error("Error Message");
    pobj.putU.fatal("Fatal Message");
    pobj.putU.ok("OK Message");

    expect(puzzle.cli.messages).to.deep.equal([
      "[debug] Debug Message",
      "[info] Info Message",
      "[error] Error Message",
      "[fatal] Fatal Message",
      "[ok] OK Message"
    ]);
  });
  it("CLITest.done should be able to stop the CLI", () => {
    const pobj = new CLITest();

    expect(puzzle.cli.shouldExit).to.be.false;
    expect(puzzle.cli.exitCode).to.equal(0);

    pobj.done();

    expect(puzzle.cli.shouldExit).to.be.true;
    expect(puzzle.cli.exitCode).to.equal(0);
  });

  it("CLITest.done should be able to stop the CLI with exit code", () => {
    const pobj = new CLITest();

    expect(puzzle.cli.shouldExit).to.be.false;
    expect(puzzle.cli.exitCode).to.equal(0);

    pobj.done(255);

    expect(puzzle.cli.shouldExit).to.be.true;
    expect(puzzle.cli.exitCode).to.equal(255);
  });
});
