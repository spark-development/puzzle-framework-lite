"use strict";

const { expect } = require("chai");

const i18n = require("../../src/middleware/i18n");

describe("i18n class check", () => {
  let originalPuzzle = null;
  let cwd = "";

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./middlewarePuzzle");
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
    delete puzzle.http.res.__;
  });

  after(() => {
    global.puzzle = originalPuzzle;
    process.chdir(cwd);
  });

  beforeEach(() => {
    puzzle.modules = {};
  });

  it("className should be i18n", () => {
    const pobj = new i18n();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("i18n");
  });

  it("i18n should register the puzzle in http mode", () => {
    const pobj = new i18n();
    expect(puzzle.http.res.__).to.be.undefined;
    pobj.use(puzzle);
    expect(puzzle.modules.i18n).to.deep.equals(pobj);
    expect(puzzle.http.res.__).to.not.be.undefined;
    expect(puzzle.http.res.__("test")).to.equals("test");
    expect(puzzle.http.res.__("test_with_params", 1)).to.equals("test with params [1]");
  });

  it("i18n should register the puzzle in cli mode", () => {
    const pobj = new i18n();
    const httpBefore = puzzle.http;
    delete puzzle.http;

    pobj.use(puzzle);
    expect(puzzle.modules.i18n).to.deep.equals(pobj);
    expect(puzzle.http).to.be.undefined;
    expect(pobj.__("test")).to.equals("test");
    expect(pobj.__("test_with_params", 1)).to.equals("test with params [1]");
    expect(pobj._locale).to.equals(puzzle.config.i18n.defaultLocale);

    puzzle.http = httpBefore;
  });

  it("i18n in CLI mode should look after PUZZLE_LANG and register a valid lang", () => {
    const pobj = new i18n();
    const httpBefore = puzzle.http;
    delete puzzle.http;

    process.env["PUZZLE_LANG"] = "ro";
    pobj.use(puzzle);
    expect(pobj._locale).to.not.equals(puzzle.config.i18n.defaultLocale);
    expect(pobj._locale).to.equals("ro");

    delete process.env["PUZZLE_LANG"];
    puzzle.http = httpBefore;
  });

  it("i18n in CLI mode should look after PLANG and register a valid lang", () => {
    const pobj = new i18n();
    const httpBefore = puzzle.http;
    delete puzzle.http;

    process.env["PLANG"] = "ro";
    pobj.use(puzzle);
    expect(pobj._locale).to.not.equals(puzzle.config.i18n.defaultLocale);
    expect(pobj._locale).to.equals("ro");

    delete process.env["PLANG"];
    puzzle.http = httpBefore;
  });

  it("i18n in CLI mode should look after PUZZLE_LANG and do not register an invalid lang", () => {
    const pobj = new i18n();
    const httpBefore = puzzle.http;
    delete puzzle.http;

    process.env["PUZZLE_LANG"] = "de";
    pobj.use(puzzle);
    expect(pobj._locale).to.not.equals("de");
    expect(pobj._locale).to.equals("en");

    delete process.env["PUZZLE_LANG"];
    puzzle.http = httpBefore;
  });

  it("i18n translate various label types", () => {
    const pobj = new i18n();
    pobj.use(puzzle);

    expect(pobj.__("test")).to.equals("test");
    expect(pobj.__("test_with_params", 1)).to.equals("test with params [1]");
    expect(pobj.__("sample.key")).to.equals("sample value");
    expect(pobj.__("drop.down")).to.equals("key");
    expect(pobj.__("drop.up")).to.equals("drop.up");
    expect(pobj.__("drop.null")).to.equals("drop.null");
    expect(pobj.__(new Error("this is a message"))).to.equals("this is a message");
    expect(pobj.__(new Object())).to.equals("Object");
  });

  it("i18n __n should return the same string as __", () => {
    const pobj = new i18n();
    pobj.use(puzzle);

    expect(pobj.__n("test")).to.equals(pobj.__("test"));
    expect(pobj.__n("test_with_params", 1)).to.equals(pobj.__("test_with_params", 1));
    expect(pobj.__n("sample.key")).to.equals(pobj.__("sample.key"));
    expect(pobj.__n("drop.down")).to.equals(pobj.__("drop.down"));
  });
});
