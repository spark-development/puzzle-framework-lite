"use strict";

const {expect} = require("chai");
const path = require("path");

const PConfig = require("../../src/core/PConfig");

describe("PConfig class check", () => {
  it("initially the datastore should be empty", () => {
    const pconfig = new PConfig();
    expect(pconfig.isEmpty).to.be.true;
  });
  it("init shouldn't do anything", () => {
    const pconfig = new PConfig();
    expect(pconfig.isEmpty).to.be.true;
    pconfig.init();
    expect(pconfig.isEmpty).to.be.true;
  });
  describe("empty init, config added", () => {
    const pconfig = new PConfig();
    it("initially the datastore should be empty", () => {
      expect(pconfig.isEmpty).to.be.true;
    });
    it("should support adding elements", () => {
      expect(pconfig.isEmpty).to.be.true;
      pconfig.set("test", 1234);
      expect(pconfig.get("test")).to.equal(1234);
      expect(pconfig.test).to.equal(1234);
      expect(pconfig.isEmpty).to.be.false;
    });
    it("should support updating elements", () => {
      expect(pconfig.test).to.equal(1234);
      pconfig.test = 0;
      expect(pconfig.get("test")).to.equal(0);
      expect(pconfig.test).to.equal(0);
      pconfig.set("test", false);
      expect(pconfig.get("test")).to.be.false;
      expect(pconfig.test).to.be.false;
    });
    it("should support deleting elements", () => {
      expect(pconfig.get("test")).to.not.be.null;
      expect(pconfig.get("test")).to.not.be.undefined;
      pconfig.delete("test");
      expect(pconfig.get("test")).to.be.undefined;
    });
    it("shouldn't delete something that doesn't exists", () => {
      expect(pconfig.load).to.not.be.undefined;
      pconfig.delete("load");
      expect(pconfig.load).to.not.be.undefined;
    });
    it("shouldn't allow overwriting base methods", () => {
      expect(pconfig.load).to.not.be.undefined;
      const configLoad = pconfig.load;
      pconfig.set("load", 123);
      expect(pconfig.load).to.not.be.undefined;
      expect(pconfig.load).to.be.equal(configLoad);
    });
    it("keys should return all elements the object has", () => {
      expect(pconfig.keys.length).to.equal(0);
      expect(pconfig.keys).to.deep.equal([]);
    });
    it("clear should clear the datastore", () => {
      expect(pconfig.isEmpty).to.be.true;
      pconfig.clear();
      expect(pconfig.isEmpty).to.be.true;
      expect(pconfig.keys.length).to.equal(0);
      expect(pconfig.keys).to.deep.equal([]);
    });
  });
  describe("empty init, config loaded", () => {
    const pconfig = new PConfig();
    it("initially the datastore should be empty", () => {
      expect(pconfig.isEmpty).to.be.true;
    });
    it("should support loading elements", () => {
      expect(pconfig.isEmpty).to.be.true;
      pconfig.load({
        test: 1234,
        test2: false,
        test3: {
          test: "in object"
        }
      });
      expect(pconfig.isEmpty).to.be.false;
    });
    it("should support reading loaded elements", () => {
      expect(pconfig.get("test")).to.equal(1234);
      expect(pconfig.test2).to.be.false;
      expect(pconfig.get("test3")).to.equal(pconfig.test3);
      expect(pconfig.get("test3")).to.have.property("test");
      expect(pconfig.get("test3").test).to.equal("in object");
    });
    it("should support adding elements", () => {
      pconfig.set("test4", {
        home: "sweet home"
      });
      expect(pconfig.get("test4")).to.have.property("home");
      expect(pconfig.test4).to.have.property("home");
      expect(pconfig.test4.home).to.equal("sweet home");
    });
    it("should support updating elements", () => {
      expect(pconfig.test).to.equal(1234);
      pconfig.test = 0;
      expect(pconfig.get("test")).to.equal(0);
      expect(pconfig.test).to.equal(0);
      pconfig.set("test", false);
      expect(pconfig.get("test")).to.be.false;
      expect(pconfig.test).to.be.false;
    });
    it("should support deleting elements", () => {
      expect(pconfig.get("test")).to.not.be.null;
      expect(pconfig.get("test")).to.not.be.undefined;
      pconfig.delete("test");
      expect(pconfig.get("test")).to.be.undefined;
      expect(pconfig.test2).to.be.false;
      expect(pconfig.get("test3")).to.equal(pconfig.test3);
      expect(pconfig.get("test3")).to.have.property("test");
      expect(pconfig.get("test3").test).to.equal("in object");
    });
    it("keys should return all elements the object has", () => {
      expect(pconfig.keys.length).to.not.equal(0);
      expect(pconfig.keys.length).to.equal(3);
      expect(pconfig.keys).to.deep.equal(["test2", "test3", "test4"]);
    });
    it("clear should clear the datastore", () => {
      expect(pconfig.isEmpty).to.be.false;
      pconfig.clear();
      expect(pconfig.isEmpty).to.be.true;
      expect(pconfig.get("test")).to.be.undefined;
      expect(pconfig.test).to.be.undefined;
      expect(pconfig.keys.length).to.equal(0);
      expect(pconfig.keys).to.deep.equal([]);
    });
  });
  describe("empty init, config loaded from env", () => {
    const pconfig = new PConfig();
    let cwd = '';
    before(() => {
      cwd = process.cwd();
      process.chdir(`${__dirname}/../_toolkit`);
    });
    after(() => {
      process.chdir(cwd);
    });

    it("current working folder should be the toolkit one", () => {
      expect(process.cwd()).to.not.equal(cwd);
      expect(process.cwd()).to.equal(path.resolve(`${__dirname}/../_toolkit`));
    });
    it("read invalid file", () => {
      expect(pconfig.isEmpty).to.be.true;
      pconfig.readEnv("test");
      expect(pconfig.isEmpty).to.be.true;
    });
    it("read valid file", () => {
      expect(pconfig.isEmpty).to.be.true;
      pconfig.readEnv();
      expect(pconfig.isEmpty).to.be.false;
    });
    it("should support reading loaded elements", () => {
      expect(pconfig.get("test")).to.equal(1);
      expect(pconfig.isTrue).to.be.false;
      expect(pconfig.get("testObj")).to.equal(pconfig.testObj);
      expect(pconfig.get("testObj")).to.have.property("home");
      expect(pconfig.get("testObj").home).to.equal("sweet home");
      expect(pconfig.get("testArray")).to.equal(pconfig.testArray);
      expect(pconfig.get("testArray").length).to.equal(3);
      expect(pconfig.get("testArray")).to.deep.equal([1, 2, 3]);
    });
    it("should support adding elements", () => {
      pconfig.set("test4", {
        home: "sweet home"
      });
      expect(pconfig.get("test4")).to.have.property("home");
      expect(pconfig.test4).to.have.property("home");
      expect(pconfig.test4.home).to.equal("sweet home");
    });
    it("should support updating elements", () => {
      expect(pconfig.test).to.equal(1);
      pconfig.test = 0;
      expect(pconfig.get("test")).to.equal(0);
      expect(pconfig.test).to.equal(0);
      pconfig.set("test", false);
      expect(pconfig.get("test")).to.be.false;
      expect(pconfig.test).to.be.false;
    });
    it("should support deleting elements", () => {
      expect(pconfig.get("test")).to.not.be.null;
      expect(pconfig.get("test")).to.not.be.undefined;
      pconfig.delete("test");
      expect(pconfig.get("test")).to.be.undefined;
      expect(pconfig.isTrue).to.be.false;
      expect(pconfig.get("testObj")).to.equal(pconfig.testObj);
      expect(pconfig.get("testObj")).to.have.property("home");
      expect(pconfig.get("testObj").home).to.equal("sweet home");
      expect(pconfig.get("testArray")).to.equal(pconfig.testArray);
      expect(pconfig.get("testArray").length).to.equal(3);
      expect(pconfig.get("testArray")).to.deep.equal([1, 2, 3]);
    });
    it("clear should clear the datastore", () => {
      expect(pconfig.isEmpty).to.be.false;
      pconfig.clear();
      expect(pconfig.isEmpty).to.be.true;
      expect(pconfig.get("test")).to.be.undefined;
      expect(pconfig.test).to.be.undefined;
    });
  });
});
