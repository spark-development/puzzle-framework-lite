"use strict";

const { expect } = require("chai");

const PError = require("../../src/exceptions/PError");

describe("PError class check", () => {
  it("className should be PError", () => {
    const pobj = new PError();
    expect(pobj).to.be.instanceOf(Error);
  });
});
