"use strict";

const { expect } = require("chai");

const ServerURLBuilder = require("../../src/http/ServerURLBuilder");

describe("ServerURLBuilder class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = {
      config: {
        http: {
          contextPath: "",
          serverURL: "http://localhost"
        }
      }
    };
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  it("ServerURLBuilder should return the same path as the one passed", () => {
    expect(ServerURLBuilder("/test")).to.equal("http://localhost/test");
  });
  it("ServerURLBuilder should return the path with context when contextPath is set", () => {
    puzzle.config.http.contextPath = "/contextPath";
    expect(ServerURLBuilder("/test")).to.equal("http://localhost/contextPath/test");
  });
});
