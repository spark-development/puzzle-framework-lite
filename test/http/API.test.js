"use strict";

const { expect } = require("chai");

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
      },
      http: {
        use(...params) {

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

  it("API should register an empty path", () => {
    const pobj = new API();
    pobj.build();
    expect(pobj.path).to.be.a("string");
    expect(pobj.path).to.equal("/api/master/");
  });
  it("API should register a given path", () => {
    const pobj = new API("test-path");
    pobj.build();
    expect(pobj.path).to.be.a("string");
    expect(pobj.path).to.equal("/api/master/test-path");
  });
  it("API should register a given path with prefix set", () => {
    puzzle.config.http.APIPath = "test/prefix";
    const pobj = new API("test-path");
    pobj.build();
    expect(pobj.path).to.be.a("string");
    expect(pobj.path).to.equal("test/prefix/test-path");
  });
});
