"use strict";

const { expect } = require("chai");
const cli = require("cli");

const CommandLoader = require("../../src/cli/CommandLoader");
const Engine = require("../../src/core/PEngine");
const InvalidInstanceType = require("../../src/exceptions/InvalidInstanceType");
const CLITest = require("./CLITest");

let originalPuzzle = null;

describe("CommandLoader class check", () => {
  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./puzzlecli");
  });
  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("className should be CommandLoader", () => {
    const pobj = new CommandLoader();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("CommandLoader");
  });

  it("use should register the CommandLoader to the engine", () => {
    const pobj = new CommandLoader();
    const engine = new Engine();

    expect(engine.commands).to.be.undefined;
    expect(engine.cli).to.be.undefined;
    pobj.use(engine);
    expect(engine.commands).to.not.be.undefined;
    expect(engine.commands).to.deep.equal(pobj);
    expect(engine.cli).to.not.be.undefined;
    expect(engine.cli).to.deep.equal(cli);
  });

  describe("cli dependent testing", () => {
    let pobj = null;
    before(() => {
      pobj = new CommandLoader();
    });
    beforeEach(() => {
      puzzle.cli.messages = [];
      puzzle.cli.command = null;
    });
    it("running without commands register should trigger a fatal error message", () => {
      puzzle.cli.args = [];
      expect(() => pobj.run()).to.not.throw();
      expect(puzzle.cli.messages).to.not.deep.equal([]);
      expect(puzzle.cli.messages).to.deep.equal([
        "[fatal] Unable to find the given command!"
      ]);
    });
    it("running a defined command should not trigger errors", () => {
      pobj.register("test", CLITest);
      expect(() => pobj.run()).to.not.throw();
      expect(puzzle.cli.messages).to.deep.equal([]);
    });
    it("running an undefined command should trigger a fatal error message", () => {
      puzzle.cli.command = "misa";
      expect(() => pobj.run()).to.not.throw();
      expect(puzzle.cli.messages).to.not.deep.equal([]);
      expect(puzzle.cli.messages).to.deep.equal([
        "[fatal] Unable to find the given command!"
      ]);
    });
  });

  describe("puzzle dependent testing", () => {
    let pobj = null;
    before(() => {
      pobj = new CommandLoader();
      pobj.use(puzzle);
    });
    it("register should register a sample command", () => {
      expect(() => pobj.register("test", CLITest)).to.not.throw();
      expect(pobj._commands.test).to.deep.equal(CLITest);
    });

    it("register shouldn't register anything else that isn't a command", () => {
      expect(() => pobj.register("test", Engine)).to.throw(InvalidInstanceType);
    });
  });
});
