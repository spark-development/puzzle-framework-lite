"use strict";

const {expect} = require("chai");

const API = require("../../src/http/API");

describe("API class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = {
      config: {
        http: {
          APIPath: ""
        }
      }
    };
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("className should be API", () => {
    const pobj = new API();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("API");
  });
});
