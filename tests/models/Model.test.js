"use strict";

const expect = require("chai").expect;

const Model = require("../../src/models/Model");

const engine = require("../_toolkit/engine");

describe("Model class check", () => {
  it("className should be Model", () => {
    const model = new Model(engine);
    expect(model.className).to.be.a("string");
    expect(model.className).to.equal("Model");
  });
});
