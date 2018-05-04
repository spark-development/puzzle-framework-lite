"use strict";

const {expect} = require("chai");

const CLITest = require("./CLITest");
const puzzle = {
  i18n: {
    __: (...msg) => `TRANSLATED: ${msg.join(' ')}`
  },
  cli: {
    messages: [],
    _push(type, msg) {
      this.messages.push(`[${type.toLowerCase()}] ${msg}`)
    },
    debug(msg) {
      return this._push("debug", msg)
    },
    info(msg) {
      return this._push("info", msg)
    },
    error(msg) {
      return this._push("error", msg)
    },
    fatal(msg) {
      return this._push("fatal", msg)
    },
    ok(msg) {
      return this._push("ok", msg)
    }
  }
};
let originalPuzzle = null;

before(() => {
  originalPuzzle = global.puzzle;
  global.puzzle = puzzle;
});

after(() => {
  global.puzzle = originalPuzzle;
});

describe("CLITest class check", () => {
  beforeEach(() => {
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
        'test'
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
    pobj.run(['test'], {test: true, test2: 123});
    expect(pobj.runArgs).to.not.be.undefined;
    expect(pobj.runOptions).to.not.be.undefined;
    expect(pobj.runArgs).to.deep.equal(['test']);
    expect(pobj.runOptions).to.deep.equal({test: true, test2: 123});
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
});
