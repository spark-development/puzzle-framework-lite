"use strict";

const { expect } = require("chai");

const SocketIO = require("../../src/socketio");

describe("SocketIO class check", () => {
  it("className should be SocketIO", () => {
    const pobj = new SocketIO();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("SocketIO");
  });
});
