"use strict";

const PError = require("./PError");

class InvalidInstanceType extends PError {
  constructor(expectedType) {
    super(puzzle.i18n.__("core.invalid-instance", expectedType));
  }
}

module.exports = InvalidInstanceType;
