"use strict";

const PError = require("./PError");

/**
 * The given instance is not valid.
 *
 * @extends exceptions.PError
 * @memberOf exceptions
 */
class InvalidInstanceType extends PError {
  /**
   * Invalid instance passed to method.
   *
   * @param {string} expectedType The expected instance to be passed to
   *                              the method.
   */
  constructor(expectedType) {
    super(puzzle.i18n.__("core.invalid-instance", expectedType));
  }
}

module.exports = InvalidInstanceType;
