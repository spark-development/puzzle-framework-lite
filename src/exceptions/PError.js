"use strict";

/**
 * Base exception class.
 *
 * @extends Error
 * @memberOf exceptions
 */
class PError extends Error {
  /**
   * Constructor of the exception.
   *
   * @param {string} message The message of the error.
   */
  constructor(message) {
    super(message);

    /**
     * Extra information that has to be passed to the user when this exception is
     * thrown.
     *
     * @member {*}
     */
    this.extra = "";
  }
}

module.exports = PError;
