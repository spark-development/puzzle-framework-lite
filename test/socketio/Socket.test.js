"use strict";

const {expect} = require("chai");

const Socket = require("../../src/socketio/Socket");

describe("Socket class check", () => {
  it("className should be Socket", () => {
    const pobj = new Socket();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("Socket");
  });
});
