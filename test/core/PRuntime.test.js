"use strict";

const { expect } = require("chai");

const TestRuntime = require("./TestRuntime");

describe("PRuntime class check", () => {
  it("cli and http only should be false", () => {
    const pobj = new TestRuntime();
    expect(pobj.httpOnly).to.be.false;
    expect(pobj.cliOnly).to.be.false;
  });
  it("cli and http only shouldn't be updateable", () => {
    const pobj = new TestRuntime();
    expect(() => (pobj.httpOnly = true)).to.throw();
    expect(() => (pobj.cliOnly = true)).to.throw();
  });
  it("beforeBoot method should set the status to beforeBoot", () => {
    const pobj = new TestRuntime();
    pobj.beforeBoot();
    expect(pobj.status).to.equal("beforeBoot");
  });
  it("boot method should set the status to boot", () => {
    const pobj = new TestRuntime();
    pobj.boot();
    expect(pobj.status).to.equal("boot");
  });
  it("afterBoot method should set the status to afterBoot", () => {
    const pobj = new TestRuntime();
    pobj.afterBoot();
    expect(pobj.status).to.equal("afterBoot");
  });
  it("beforeOnline method should set the status to beforeOnline", () => {
    const pobj = new TestRuntime();
    pobj.beforeOnline();
    expect(pobj.status).to.equal("beforeOnline");
  });
  it("online method should set the status to online", () => {
    const pobj = new TestRuntime();
    pobj.online();
    expect(pobj.status).to.equal("online");
  });
  it("afterOnline method should set the status to afterOnline", () => {
    const pobj = new TestRuntime();
    pobj.afterOnline();
    expect(pobj.status).to.equal("afterOnline");
  });
  it("beforeShutdown method should set the status to beforeShutdown", () => {
    const pobj = new TestRuntime();
    pobj.beforeShutdown();
    expect(pobj.status).to.equal("beforeShutdown");
  });
  it("shutdown method should set the status to shutdown", () => {
    const pobj = new TestRuntime();
    pobj.shutdown();
    expect(pobj.status).to.equal("shutdown");
  });
  it("afterShutdown method should set the status to afterShutdown", () => {
    const pobj = new TestRuntime();
    pobj.afterShutdown();
    expect(pobj.status).to.equal("afterShutdown");
  });
});
