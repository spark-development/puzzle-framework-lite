"use strict";

const { expect } = require("chai");

const packageJson = require("../../package.json");
const PEngine = require("../../src/core/PEngine");
const PUse = require("../../src/core/PUse");
const InMemoryLog = require("./InMemoryLog");

describe("PEngine class check", () => {
  it("className should be PEngine", () => {
    const pobj = new PEngine();
    expect(pobj.className).to.be.a("string");
    expect(pobj.className).to.equal("PEngine");
  });

  it("property setter/getter should work", () => {
    const pobj = new PEngine();
    let x;
    expect(pobj.get("test")).to.be.undefined;
    expect(pobj.test).to.be.undefined;
    pobj.set("test", "ana are mere");
    expect(pobj.test).to.not.be.null;
    expect(pobj.test).to.not.be.undefined;
    expect(pobj.test).to.equal("ana are mere");
    expect(pobj.get("test")).to.not.be.null;
    expect(pobj.get("test")).to.not.be.undefined;
    expect(pobj.get("test")).to.equal("ana are mere");
    pobj.unset("test");
    expect(pobj.get("test")).to.be.undefined;
    expect(pobj.test).to.be.undefined;
    expect(pobj.unset("test")).to.be.undefined;
    expect(pobj.unset()).to.be.undefined;
  });

  it("version should be equal to the one in package.json", () => {
    const pobj = new PEngine();
    expect(pobj.version.version).to.equal(packageJson.version);
  });

  it("version should be overrideable", () => {
    const pobj = new PEngine();

    expect(() => (pobj.version = "test")).to.not.throw();
    expect(pobj.version.className).to.equal("PVersion");
    expect(pobj.version.version).to.equal(packageJson.version);
  });

  it("app should have some default data", () => {
    const pobj = new PEngine();

    expect(pobj.app.name).to.equal("Puzzle Framework | Lite");
    expect(pobj.app.version).to.equal(packageJson.version);
    expect(pobj.app.modules).to.deep.equal([]);
    expect(pobj.appVersion.version).to.equal(packageJson.version);
    expect(pobj.appVersion.className).to.equal("PVersion");
    expect(() => (pobj.appVersion = "test")).to.throw();
  });

  it("app should be overrideable with puzzles", () => {
    const pobj = new PEngine();

    pobj.app = {
      name: "Test Test",
      version: "0.0.0",
      puzzles: [
        "test",
        "test.teste"
      ]
    };
    expect(pobj.app.name).to.not.equal("Puzzle Framework | Lite");
    expect(pobj.app.version).to.not.equal(packageJson.version);
    expect(pobj.appVersion.version).to.not.equal(packageJson.version);
    expect(pobj.app.modules).to.not.deep.equal([]);
    expect(pobj.app.name).to.equal("Test Test");
    expect(pobj.app.version).to.equal("0.0.0");
    expect(pobj.app.modules).to.deep.equal(["test", "test.teste"]);
    expect(pobj.appVersion.version).to.equal("0.0.0");
    expect(pobj.appVersion.className).to.equal("PVersion");
    expect(() => (pobj.appVersion = "test")).to.throw();
  });

  it("app should be overrideable with modules", () => {
    const pobj = new PEngine();

    pobj.app = {
      name: "Test Test",
      version: "0.0.0",
      modules: [
        "test",
        "test.teste"
      ]
    };
    expect(pobj.app.name).to.not.equal("Puzzle Framework | Lite");
    expect(pobj.app.version).to.not.equal(packageJson.version);
    expect(pobj.appVersion.version).to.not.equal(packageJson.version);
    expect(pobj.app.modules).to.not.deep.equal([]);
    expect(pobj.app.name).to.equal("Test Test");
    expect(pobj.app.version).to.equal("0.0.0");
    expect(pobj.app.modules).to.deep.equal(["test", "test.teste"]);
    expect(pobj.appVersion.version).to.equal("0.0.0");
    expect(pobj.appVersion.className).to.equal("PVersion");
    expect(() => (pobj.appVersion = "test")).to.throw();
  });

  it("app should be overrideable with empty", () => {
    const pobj = new PEngine();

    pobj.app = {
      modules: []
    };
    expect(pobj.app.name).to.equal("Puzzle Framework | Lite");
    expect(pobj.app.version).to.equal(packageJson.version);
    expect(pobj.appVersion.version).to.equal(packageJson.version);
    expect(pobj.app.modules).to.deep.equal([]);
    pobj.app = {};
    expect(pobj.app.name).to.equal("Puzzle Framework | Lite");
    expect(pobj.app.version).to.equal(packageJson.version);
    expect(pobj.appVersion.version).to.equal(packageJson.version);
    expect(pobj.app.modules).to.deep.equal([]);
  });

  it("import should fetch the same module as require(PEngine)", () => {
    const pobj = new PEngine();

    expect(pobj.import("core/PEngine")).to.equal(PEngine);
  });

  describe("env checks", () => {
    it("env should be equal to NODE_ENV or local", () => {
      const pobj = new PEngine();

      expect(pobj.env).to.equal(process.env.NODE_ENV || "local");
    });

    it("env should be equal to local when NODE_ENV is null or undefined", () => {
      const pobj = new PEngine();

      const beforeTest = process.env.NODE_ENV;
      delete process.env.NODE_ENV;
      expect(pobj.env).to.equal("local");
      process.env.NODE_ENV = beforeTest;
    });

    it("env shouldn't be updateable", () => {
      const pobj = new PEngine();

      expect(() => (pobj.env = "new")).to.throw();
    });
  });

  describe("logger checks", () => {
    it("logger should be null by default", () => {
      const pobj = new PEngine();

      expect(pobj.log).to.be.null;
      expect(pobj.logLevel).to.equal("");
    });
    it("logger should be updateable", () => {
      const pobj = new PEngine();
      const messages = {
        debug: [],
        info: []
      };
      const logger = {
        debug(msg) {
          messages.debug.push(msg);
        },
        info(msg) {
          messages.info.push(msg);
        }
      };

      expect(pobj.log).to.be.null;
      expect(pobj.logLevel).to.equal("");
      pobj.log = logger;
      expect(pobj.log).to.not.be.null;
      expect(pobj.log).to.deep.equal(logger);
      expect(pobj.logLevel).to.equal("");
      pobj.log.debug("test 1");
      pobj.log.info("test 2");
      pobj.log.info("test 3");
      expect(messages.debug.length).to.equal(1);
      expect(messages.info.length).to.equal(2);
      expect(messages.debug).to.deep.equal(["test 1"]);
      expect(messages.info).to.deep.equal(["test 2", "test 3"]);
    });
    it("logger should accept a logger class", () => {
      const pobj = new PEngine();
      expect(pobj.log).to.be.null;
      expect(pobj.logLevel).to.equal("");
      pobj.log = new InMemoryLog();
      expect(pobj.log).to.not.be.null;
      expect(pobj.logLevel).to.not.equal("");
      expect(pobj.logLevel).to.equal("test");
      pobj.log.debug("test 1");
      pobj.log.info("test 2");
      pobj.log.info("test 3");
      expect(pobj.log.size).to.equal(3);
      expect(pobj.log.text).to.deep.equal(["[DEBUG] test 1", "[INFO] test 2", "[INFO] test 3"]);
    });
  });

  describe("use should add extra functionality to engine", () => {
    const pobj = new PEngine();

    it("should do nothing if nothing is passed", () => {
      pobj.use();
      expect(pobj.myTest).to.be.undefined;
    });
    it("should do nothing if null is passed", () => {
      pobj.use();
      expect(pobj.myTest).to.be.undefined;
    });
    it("should add myTest if function is passed", () => {
      expect(pobj.myTest).to.be.undefined;
      pobj.use((engine) => {
        engine.set("myTest", "test");
      });
      expect(pobj.myTest).to.equal("test");
      pobj.unset("myTest");
      expect(pobj.myTest).to.be.undefined;
    });
    it("should add myTest if object is passed", () => {
      expect(pobj.myTest).to.be.undefined;
      pobj.use((class Test {
        use(engine) {
          engine.set("myTest", "test");
        }
      }));
      expect(pobj.myTest).to.equal("test");
      pobj.unset("myTest");
      expect(pobj.myTest).to.be.undefined;
    });
    it("shouldn't add myTest if object without use is passed", () => {
      expect(pobj.myTest).to.be.undefined;
      pobj.use((class Test {
        user(engine) {
          engine.set("myTest", "test");
        }
      }));
      expect(pobj.myTest).to.be.undefined;
    });
    it("should add myTest if object that extends PUse is passed", () => {
      expect(pobj.myTest).to.be.undefined;
      pobj.use((class Test extends PUse {
        use(engine) {
          engine.set("myTest", "test");
        }
      }));
      expect(pobj.myTest).to.equal("test");
      pobj.unset("myTest");
      expect(pobj.myTest).to.be.undefined;
    });
    it("should do nothing if anything else is passed", () => {
      pobj.use([]);
      expect(pobj.myTest).to.be.undefined;
      pobj.use("123");
      expect(pobj.myTest).to.be.undefined;
    });
  });
});
