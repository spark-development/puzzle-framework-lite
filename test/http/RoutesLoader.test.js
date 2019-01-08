"use strict";

const {expect} = require("chai");

const RoutesLoader = require("../../src/http/RoutesLoader");

describe("RoutesLoader class check", () => {
  let cwd = "";
  let originalPuzzle = null;

  before(() => {
    cwd = process.cwd();
    process.chdir(`${__dirname}/../_toolkit/starter`);
    originalPuzzle = global.puzzle;
    global.puzzle = {
      modules: {},
      set(key, value) {
        this.modules[key] = value;
      }
    };
  });

  after(() => {
    process.chdir(cwd);
    global.puzzle = originalPuzzle;
  });

  beforeEach(() => {
    delete puzzle.class_route;
    delete puzzle.simple_route;
    puzzle.modules = {};
  });

  it("className should be RoutesLoader", () => {
    const pobj = new RoutesLoader();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("RoutesLoader");
  });
  it("RoutesLoader should register routes object", () => {
    const pobj = new RoutesLoader();
    pobj.use(puzzle);
    expect(puzzle.modules.routes).to.deep.equals(pobj);
  });
  it("RoutesLoader should register routes from a default folder", () => {
    const pobj = new RoutesLoader();
    pobj.register(process.cwd());
    expect(puzzle.simple_route).to.not.be.undefined;
    expect(puzzle.class_route).to.be.undefined;
  });
  it("RoutesLoader should register routes from a given folder", () => {
    const pobj = new RoutesLoader();
    pobj.register(process.cwd(), "sample.routes/simple");
    expect(puzzle.simple_route).to.not.be.undefined;
    expect(puzzle.class_route).to.be.undefined;
  });
  it("RoutesLoader should build routes from a default folder", () => {
    const pobj = new RoutesLoader();
    pobj.build(process.cwd());
    expect(puzzle.simple_route).to.be.undefined;
    expect(puzzle.class_route).to.not.be.undefined;
  });
  it("RoutesLoader should build routes from a given folder", () => {
    const pobj = new RoutesLoader();
    pobj.build(process.cwd(), "sample.routes/class");
    expect(puzzle.simple_route).to.be.undefined;
    expect(puzzle.class_route_no_import).to.be.undefined;
    expect(puzzle.class_route).to.not.be.undefined;
  });
});
