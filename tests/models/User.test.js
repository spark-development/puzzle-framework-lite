"use strict";

const _ = require("lodash");

const expect = require("chai").expect;

const User = require("../../src/models/User");
const Model = require("../../src/models/Model");

const engine = require("../_toolkit/engine");

describe("User Model class Check", () => {
  describe("User class check", () => {
    it("className should be User", () => {
      const user = new User(engine);
      expect(user.className).to.be.a("string");
      expect(user.className).to.equal("User");
    });
    it("User should extend Model", () => {
      const user = new User(engine);
      expect(user).to.be.an.instanceOf(Model);
    });
    it("User should be admin", () => {
      const user = new User(engine);
      expect(user.isAdmin).to.be.true;
    });
    it("null permission should fail", () => {
      const user = new User(engine);
      expect(user.allowed(null)).to.be.false;
    });
    it("empty parameter permission should fail", () => {
      const user = new User(engine);
      expect(user.allowed()).to.be.false;
    });
    it("empty string permission should fail", () => {
      const user = new User(engine);
      expect(user.allowed("")).to.be.false;
    });
    it("some string permission should pass", () => {
      const user = new User(engine);
      expect(user.allowed("test")).to.be.true;
    });
  });

  describe("User operations check", () => {
    const userData = {
      email: "test@data.com",
      password: "123456",
      admin: true,
      firstName: "Test",
      lastName: "Data"
    };

    let user;
    before(() => {
      user = new User(engine);
      user.compose();
      user = user.model;
    });

    it("should be no data", () => {
      return user.getAll()
        .then((users) => {
          expect(users.length).to.be.equal(0);
        });
    });

    it("should create data", () => {
      return user.create(userData)
        .then((user) => {
          expect(user).to.not.be.null;

          _.each(userData, (v, k) => {
            expect(user[k]).to.be.equal(v);
          });
        });
    });

    it("should be some data", () => {
      return user.getAll()
        .then((users) => {
          expect(users.length).to.be.equal(1);
        });
    });

    it("should be get one element", () => {
      return user.getOne(1)
        .then((user) => {
          expect(user).to.not.be.null;
          _.each(userData, (v, k) => {
            expect(user[k]).to.be.equal(v);
          });
        });
    });

    it("should be able to delete elements", () => {
      return user.getOne(1)
        .then((user) => {
          expect(user).to.not.be.null;
          return user.delete();
        })
        .then((result) => {
          expect(result).to.be.true;
        });
    });

    it("shouldn't be any data", () => {
      return user.getAll()
        .then((users) => {
          expect(users.length).to.be.equal(0);
        });
    });
  });
});
