"use strict";

/**
 * Test data with dummy data in engine.
 */
const engine = {
  log: (...args) => {
    console.log(...args);
  }
};

module.exports = engine;
