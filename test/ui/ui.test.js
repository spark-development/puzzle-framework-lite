"use strict";

const { expect } = require("chai");
const path = require("path");

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
  it("config.views.enabled set to false shouldn't do anything to online", () => {
    const pobj = new UIMain();
    puzzle.config.views.enabled = false;
    expect(pobj._paths).to.be.undefined;
    expect(() => pobj.online()).to.not.throw();
    expect(pobj._paths).to.be.undefined;
  });
  it("config.views.enabled set to true should register views to engine", () => {
    const pobj = new UIMain();
    expect(puzzle.config.views.enabled).to.be.true;
    expect(puzzle.modules._modules.views).to.be.undefined;
    expect(puzzle.handlebars).to.be.undefined;
    expect(puzzle.viewConfig).to.be.undefined;
    pobj.use(puzzle);
    expect(pobj._paths).to.deep.equal({
      views: [
        path.resolve(puzzle.config.views.views)
      ],
      partials: [
        path.resolve(puzzle.config.views.partials)
      ]
    });
    expect(puzzle.modules._modules.views).to.not.be.undefined;
    expect(puzzle.handlebars).to.not.be.undefined;
    expect(puzzle.viewConfig).to.not.be.undefined;
  });
  it("config.views.enabled set to true should throw an error because http isn't defined", () => {
    const pobj = new UIMain();
    expect(pobj._paths).to.be.undefined;
    expect(() => pobj.online()).to.throw();
    expect(pobj._paths).to.be.undefined;
  });
  it("config.views.enabled set to true shouldn't throw an error when http is defined", () => {
    const pobj = new UIMain();
    puzzle.http = {
      _paths: {},
      _keys: {},
      _engines: {},
      engine(type, handler) {
        this._engines[type] = handler;
      },
      set(key, value) {
        this._keys[key] = value;
      },
      use(path, handler) {
        this._paths[path] = handler;
      }
    };
    pobj.use(puzzle);
    expect(puzzle.http._keys.views).to.be.undefined;
    expect(puzzle.http._keys["view engine"]).to.be.undefined;
    expect(puzzle.http._paths["/"]).to.be.undefined;
    expect(puzzle.http._engines["hbs"]).to.be.undefined;
    expect(pobj._paths).to.not.be.undefined;
    expect(() => pobj.online()).to.not.throw();
    expect(pobj._paths).to.not.be.undefined;
    expect(puzzle.http._keys.views).to.deep.equal([
      path.resolve(puzzle.config.views.views)
    ]);
    expect(puzzle.http._keys["view engine"]).to.equal("hbs");
    expect(puzzle.http._paths["/"]).to.not.be.undefined;
    expect(puzzle.http._engines["hbs"]).to.not.be.undefined;
  });
  it("viewConfig should set paths for views and partials", () => {
    const pobj = new UIMain();
    pobj.use(puzzle);
    expect(pobj._paths).to.deep.equal({
      views: [
        path.resolve(puzzle.config.views.views)
      ],
      partials: [
        path.resolve(puzzle.config.views.partials)
      ]
    });
    puzzle.viewConfig.view("test");
    puzzle.viewConfig.partials("test");
    expect(pobj._paths).to.deep.equal({
      views: [
        path.resolve(puzzle.config.views.views),
        path.resolve("test")
      ],
      partials: [
        path.resolve(puzzle.config.views.partials),
        path.resolve("test")
      ]
    });
  });
});
