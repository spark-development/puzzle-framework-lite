"use strict";

const { expect } = require("chai");

const PEnum = require("../../src/core/PEnum");
let originalPuzzle = null;

describe("PEnum class check", () => {
  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = {
      i18n: {
        __(...params) {
          return params.join(" ");
        }
      }
    };
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("PEnum should register string", () => {
    const pobj = new PEnum("test", "enum", "with values");
    expect(pobj.TEST)
      .to
      .equal("TEST");
    expect(pobj.ENUM)
      .to
      .equal("ENUM");
    expect(pobj.WITH_VALUES)
      .to
      .equal("WITH VALUES");
    expect(pobj.length)
      .to
      .equal(3);
    expect(pobj.keys).to.deep.equal(["TEST", "ENUM", "WITH_VALUES"]);
  });
  it("PEnum should register object", () => {
    const pobj = new PEnum({
      monday: 1,
      tuesday: 2
    });
    expect(pobj.MONDAY)
      .to
      .equal(1);
    expect(pobj.TUESDAY)
      .to
      .equal(2);
    expect(pobj.length)
      .to
      .equal(2);
    expect(pobj.keys).to.deep.equal(["MONDAY", "TUESDAY"]);
  });
  it("PEnum should register strings from array", () => {
    const pobj = new PEnum(["test", "enum", "with values"]);
    expect(pobj.TEST)
      .to
      .equal("TEST");
    expect(pobj.ENUM)
      .to
      .equal("ENUM");
    expect(pobj.WITH_VALUES)
      .to
      .equal("WITH VALUES");
    expect(pobj.length)
      .to
      .equal(3);
    expect(pobj.keys).to.deep.equal(["TEST", "ENUM", "WITH_VALUES"]);
  });
  it("PEnum shouldn't register any other types", () => {
    let pobj = null;
    expect(() => {
      pobj = new PEnum(123, 32, 11);
    })
      .to
      .throw();
    expect(pobj)
      .to
      .be
      .null;
    expect(() => {
      pobj = new PEnum([1, 2, 3], ["4", "five", "six"]);
    })
      .to
      .throw();
    expect(pobj)
      .to
      .be
      .null;
  });
  it("PEnum shouldn't allow enum updates", () => {
    let pobj = new PEnum("test", "enum");
    expect(pobj.TEST)
      .to
      .equal("TEST");
    expect(() => {pobj.TEST = 0;})
      .to
      .throw();
    expect(pobj.TEST)
      .to
      .equal("TEST");

    pobj = new PEnum({
      monday: 1,
    });
    expect(pobj.MONDAY)
      .to
      .equal(1);
    expect(() => {pobj.MONDAY = 0;})
      .to
      .throw();
    expect(pobj.MONDAY)
      .to
      .equal(1);

    expect(() => {pobj.TEST = 0;})
      .to
      .not
      .throw();
  });
});
