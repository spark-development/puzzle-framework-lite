"use strict";

const expect = require("chai").expect;

const NoPermission = require("../../src/exceptions/NoPermission");

const pullUp = require("../_toolkit/pullUp");
const pullDown = require("../_toolkit/pullDown");

describe("ACL Module Check", () => {
  let puzzle;
  let engine;

  describe("acl not enabled", () => {
    before(() => {
      puzzle = pullUp({
        core:{
          acl: false
        }
      });
      engine = puzzle.engine;
    });

    after(() => {
      pullDown(puzzle);
      puzzle = null;
      engine = null;
    });

    it("engine.acl should not be active", (done) => {
      expect(engine.acl).to.be.undefined;
      done();
    });
  });

  describe("acl enabled", () => {
    before(() => {
      puzzle = pullUp();
      engine = puzzle.engine;
    });

    after(() => {
      pullDown(puzzle);
      puzzle = null;
      engine = null;
    });

    it("engine.acl should be active", (done) => {
      expect(engine.acl).to.not.be.undefined;
      done();
    });

    it("acl.has works with given permissions list", (done) => {
      const x = new engine.acl(["test", "test123"]);
      expect(x).to.be.instanceOf(engine.acl);

      expect(x.has("test")).to.be.true;
      expect(x.has("test123")).to.be.true;
      expect(x.has("123")).to.be.false;
      done();
    });

    it("acl.allowed works with given permissions list", (done) => {
      const x = new engine.acl(["test", "test123"]);
      expect(x).to.be.instanceOf(engine.acl);

      expect(() => x.allowed("test")).to.not.throw(NoPermission);
      expect(() => x.allowed("test123")).to.not.throw(NoPermission);
      expect(() => x.allowed("123")).to.throw(NoPermission);
      done();
    });
  });
});
