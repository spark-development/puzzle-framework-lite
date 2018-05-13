"use strict";

const { expect } = require("chai");

const i18n = require("../../src/middleware/i18n");

describe("i18n class check", () => {
  it("className should be i18n", () => {
    const pobj = new i18n();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("i18n");
  });
});
