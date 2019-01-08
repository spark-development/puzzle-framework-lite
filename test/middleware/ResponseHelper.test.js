"use strict";

const { expect } = require("chai");

const ResponseHelper = require("../../src/middleware/ResponseHelper");

describe("ResponseHelper class check", () => {
  let originalPuzzle = null;

  before(() => {
    originalPuzzle = global.puzzle;
    global.puzzle = require("./middlewarePuzzle");
  });

  after(() => {
    global.puzzle = originalPuzzle;
  });

  beforeEach(() => {
    puzzle.http.middleware = false;
    puzzle.http.res.response = {};
    puzzle.http.res.statusCode = 200;
    delete puzzle.http.res.ok;
    delete puzzle.http.res.error;
    delete puzzle.http.res.throw;
  });

  it("ResponseHelper should load express middlewares", () => {
    expect(ResponseHelper).to.be.instanceOf(Object);

    ResponseHelper();
    expect(puzzle.http.middleware).to.be.true;
    expect(puzzle.http.res.ok).to.not.be.undefined;
    expect(puzzle.http.res.error).to.not.be.undefined;
    expect(puzzle.http.res.throw).to.not.be.undefined;
  });
  it("ResponseHelper middlewares ok should register an ok message", () => {
    expect(ResponseHelper).to.be.instanceOf(Object);

    ResponseHelper();
    expect(puzzle.http.middleware).to.be.true;
    puzzle.http.res.ok("test");
    expect(puzzle.http.res.response).to.deep.equals({
      status: "ok",
      message: "test"
    });
  });
  it("ResponseHelper middlewares error should register an error message", () => {
    expect(ResponseHelper).to.be.instanceOf(Object);

    ResponseHelper();
    expect(puzzle.http.middleware).to.be.true;
    puzzle.http.res.error("Test Type", "test");
    expect(puzzle.http.res.response).to.deep.equals({
      status: "error",
      type: "Test Type",
      message: "test"
    });
    expect(puzzle.http.res.statusCode).to.equals(500);
    puzzle.http.res.error("Test Type 404", "test 404", 404);
    expect(puzzle.http.res.response).to.deep.equals({
      status: "error",
      type: "Test Type 404",
      message: "test 404"
    });
    expect(puzzle.http.res.statusCode).to.equals(404);
  });
  it("ResponseHelper middlewares throw should register an error message", () => {
    expect(ResponseHelper).to.be.instanceOf(Object);

    ResponseHelper();
    expect(puzzle.http.middleware).to.be.true;
    const error = new Error("Test error");
    puzzle.http.res.throw(error);
    expect(puzzle.http.res.response).to.deep.equals({
      status: "error",
      type: "Error",
      message: "Test error"
    });
    expect(puzzle.http.res.statusCode).to.equals(500);
    error.httpCode = 600;
    puzzle.http.res.throw(error);
    expect(puzzle.http.res.response).to.deep.equals({
      status: "error",
      type: "Error",
      message: "Test error"
    });
    expect(puzzle.http.res.statusCode).to.equals(600);
  });
});
