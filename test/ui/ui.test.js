"use strict";

const { expect } = require("chai");

const UIMain = require("../../src/ui");

describe("UIMain class check", () => {
  it("className should be UIMain", () => {
    const pobj = new UIMain();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("UIMain");
  });
});
