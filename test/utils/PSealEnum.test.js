"use strict";

const { expect } = require("chai");

const PSealEnum = require("../../src/utils/PSealEnum");
let originalPuzzle = null;

describe("PSealEnum class check", () => {
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

  it("PSealEnum should register string", () => {
    const pobj = PSealEnum("test", "enum", "with values");
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
  });
  it("PSealEnum should register object", () => {
    const pobj = PSealEnum({
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
  });
  it("PSealEnum shouldn't register any other types", () => {
    let pobj = null;
    expect(() => {
      pobj = PSealEnum(123, 32, 11);
    })
      .to
      .throw();
    expect(pobj)
      .to
      .be
      .null;
    expect(() => {
      pobj = PSealEnum([1, 2, 3], ["4", "five", "six"]);
    })
      .to
      .throw();
    expect(pobj)
      .to
      .be
      .null;
  });
  it("PSealEnum shouldn't allow enum updates", () => {
    let pobj = PSealEnum("test", "enum");
    expect(pobj.TEST)
      .to
      .equal("TEST");
    expect(() => {pobj.TEST = 0;})
      .to
      .throw();
    expect(pobj.TEST)
      .to
      .equal("TEST");

    pobj = PSealEnum({
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
      .throw();
  });
});
