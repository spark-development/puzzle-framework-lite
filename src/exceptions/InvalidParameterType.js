"use strict";

const PError = require("./PError");

/**
 * The given parameters are not valid.
 *
 * @extends exceptions.PError
 * @memberOf exceptions
 */
class InvalidParameterType extends PError {
  /**
   * Invalid parameters passed to method.
   */
  constructor() {
    super(puzzle.i18n.__("core.invalid-parameters"));
  }
}

module.exports = InvalidParameterType;
