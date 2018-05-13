"use strict";

const { expect } = require("chai");

const URLBuilder = require("../../src/http/URLBuilder");

describe("URLBuilder class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = {
      config: {
        http: {
          contextPath: ""
        }
      }
    };
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("URLBuilder should return the same path as the one passed", () => {
    expect(URLBuilder("/test")).to.equal("/test");
  });
  it("URLBuilder should return the path with context when contextPath is set", () => {
    puzzle.config.http.contextPath = "contextPath";
    expect(URLBuilder("/test")).to.equal("contextPath/test");
    puzzle.config.http.contextPath = "contextPath/";
    expect(URLBuilder("/test")).to.equal("contextPath/test");
    puzzle.config.http.contextPath = "/contextPath";
    expect(URLBuilder("/test")).to.equal("/contextPath/test");
  });
});
