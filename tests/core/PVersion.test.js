"use strict";

const expect = require("chai").expect;
const PVersion = require("../../src/core/PVersion");

describe("PVersion class check", () => {
  it("should be 1.3.0", () => {
    const v = new PVersion();
    expect(v.version).to.be.a("string");
    expect(v.version).to.equal("1.3.0");
  });
  it("should be given parameter value", () => {
    const v = new PVersion("1.0.0");
    expect(v.version).to.be.a("string");
    expect(v.version).to.equal("1.0.0");
  });
  it("should be set parameter value", () => {
    const v = new PVersion();
    expect(v.version).to.be.a("string");
    expect(v.version).not.equal("1.0.0");
    v.version = "1.0.0";
    expect(v.version).to.equal("1.0.0");
  });
  it("className should be PVersion", () => {
    const v = new PVersion();
    expect(v.className).to.be.a("string");
    expect(v.className).to.equal("PVersion");
  });
});
