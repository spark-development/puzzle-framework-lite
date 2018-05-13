"use strict";

const { expect } = require("chai");

const InvalidInstanceType = require("../../src/exceptions/InvalidInstanceType");
let originalPuzzle = null;

describe("InvalidInstanceType class check", () => {
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
  it("className should be InvalidInstanceType", () => {
    const pobj = new InvalidInstanceType();
    expect(pobj).to.be.instanceOf(Error);
  });
  it("InvalidInstanceType should have a custom message", () => {
    let pobj = new InvalidInstanceType();
    expect(pobj.message).to.be.equal("core.invalid-instance ");
    pobj = new InvalidInstanceType("Test");
    expect(pobj.message).to.be.equal("core.invalid-instance Test");
  });
});
