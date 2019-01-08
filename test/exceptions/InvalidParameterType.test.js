"use strict";

const { expect } = require("chai");

const InvalidParameterType = require("../../src/exceptions/InvalidParameterType");
let originalPuzzle = null;

describe("InvalidParameterType class check", () => {
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
  it("className should be InvalidParameterType", () => {
    const pobj = new InvalidParameterType();
    expect(pobj).to.be.instanceOf(Error);
  });
  it("InvalidParameterType should have a custom message", () => {
    let pobj = new InvalidParameterType();
    expect(pobj.message).to.be.equal("core.invalid-parameters");
  });
});
