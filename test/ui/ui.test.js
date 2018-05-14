"use strict";

const { expect } = require("chai");

const UIMain = require("../../src/ui");

let originalPuzzle = null;
let cwd = "";

describe("UIMain class check", () => {
  before(() => {
    cwd = process.cwd();
  });
  after(() => {
    process.chdir(cwd);
  });

  beforeEach(() => {
    process.chdir(`${__dirname}/../_toolkit/starter`);
    originalPuzzle = global.puzzle;
    delete global.puzzle;
    delete require.cache[require.resolve("../../src/puzzleInit")];
    global.puzzle = require("../../src/puzzleInit");
    puzzle.log = {
      debug() {

      }
    };
  });
  afterEach(() => {
    puzzle.modules.shutdown();
    global.puzzle = originalPuzzle;
  });

  it("className should be UIMain", () => {
    const pobj = new UIMain();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("UIMain");
  });
  it("config.views.enabled set to false shouldn't register views to engine", () => {
    const pobj = new UIMain();
    puzzle.config.views.enabled = false;
    expect(puzzle.config.views.enabled).to.be.false;
    expect(puzzle.modules._modules.views).to.be.undefined;
    expect(puzzle.handlebars).to.be.undefined;
    expect(puzzle.viewConfig).to.be.undefined;
    pobj.use(puzzle);
    expect(puzzle.modules._modules.views).to.be.undefined;
    expect(puzzle.handlebars).to.be.undefined;
    expect(puzzle.viewConfig).to.be.undefined;
  });
  it("config.views.enabled set to true should register views to engine", () => {
    const pobj = new UIMain();
    expect(puzzle.config.views.enabled).to.be.true;
    expect(puzzle.modules._modules.views).to.be.undefined;
    expect(puzzle.handlebars).to.be.undefined;
    expect(puzzle.viewConfig).to.be.undefined;
    pobj.use(puzzle);
    expect(puzzle.modules._modules.views).to.not.be.undefined;
    expect(puzzle.handlebars).to.not.be.undefined;
    expect(puzzle.viewConfig).to.not.be.undefined;
  });
});
