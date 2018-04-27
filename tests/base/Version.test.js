"use strict";

const { expect } = require("chai");
const Version = require("../../src/base/Version");

describe("Version class check", () => {
  it("should be 1.3.0", () => {
    const v = new Version();
    expect(v.version).to.be.a("string");
    expect(v.version).to.equal("1.3.0");
  });
  it("should be given parameter value", () => {
    const v = new Version("1.0.0");
    expect(v.version).to.be.a("string");
    expect(v.version).to.equal("1.0.0");
  });
  it("should be set parameter value", () => {
    const v = new Version();
    expect(v.version).to.be.a("string");
    expect(v.version).not.equal("1.0.0");
    v.version = "1.0.0";
    expect(v.version).to.equal("1.0.0");
  });
  it("className should be Version", () => {
    const v = new Version();
    expect(v.className).to.be.a("string");
    expect(v.className).to.equal("Version");
  });
});
