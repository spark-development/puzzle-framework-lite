"use strict";

const { expect } = require("chai");

const PState = require("../../src/core/PState");

describe("PState class check", () => {
  const pobj = new PState();
  it("initially the state should be empty", () => {
    expect(pobj.state).to.equal("");
  });
  it("beforeBoot method should keep the previous state", () => {
    pobj.beforeBoot();
    expect(pobj.state).to.equal("");
  });
  it("boot method should set the state to boot", () => {
    pobj.boot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
  });
  it("afterBoot method should keep the previous state", () => {
    pobj.afterBoot();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
  });
  it("beforeOnline method should keep the previous state", () => {
    pobj.beforeOnline();
    expect(pobj.state).to.equal(PState.STATES.BOOT);
  });
  it("online method should set the status to online", () => {
    pobj.online();
    expect(pobj.state).to.equal(PState.STATES.ONLINE);
  });
  it("afterOnline method should keep the previous state", () => {
    pobj.afterOnline();
    expect(pobj.state).to.equal(PState.STATES.ONLINE);
  });
  it("beforeShutdown method should keep the previous state", () => {
    pobj.beforeShutdown();
    expect(pobj.state).to.equal(PState.STATES.ONLINE);
  });
  it("shutdown method should set the state to shutdown", () => {
    pobj.shutdown();
    expect(pobj.state).to.equal(PState.STATES.SHUTDOWN);
  });
  it("afterShutdown method should set the state to halt", () => {
    pobj.afterShutdown();
    expect(pobj.state).to.equal(PState.STATES.HALT);
  });
});
