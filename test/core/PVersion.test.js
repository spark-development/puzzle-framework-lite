"use strict";

const { expect } = require("chai");
const PVersion = require("../../src/core/PVersion");
const PackageJSON = require("../../package.json");

describe("PVersion class check", () => {
  it("should be equal to the one in package", () => {
    const v = new PVersion();
    expect(v.version).to.be.a("string");
    expect(v.version).to.equal(PackageJSON.version);
  });
  it("should be given parameter value", () => {
    const v = new PVersion("1.0.0");
    expect(v.version).to.be.a("string");
    expect(v.version).to.equal("1.0.0");
  });
  it("should be set parameter value", () => {
    const v = new PVersion();
    expect(v.version).to.be.a("string");
    expect(v.version).not.equal("0.0.0");
    v.version = "0.0.0";
    expect(v.version).to.equal("0.0.0");
  });
  it("className should be PVersion", () => {
    const v = new PVersion();
    expect(v.className).to.be.a("string");
    expect(v.className).to.equal("PVersion");
  });
});
