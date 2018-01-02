"use strict";

const InMemoryStorage = require("../../src/models/InMemoryStorage");


/**
 * Test data with dummy data in engine.
 */
const engine = {
  models: {
    storage: new InMemoryStorage({})
  },
  log: (...args) => {
    console.log(...args);
  }
};

module.exports = engine;
