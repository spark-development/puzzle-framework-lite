"use strict";

/**
 * This is the base class of the Puzzle Framework.
 *
 * @memberOf base
 */
class PBase {
  /**
   * Checks if the passed parameter is valid.
   *
   * @param {*} element The variable to be checked.
   *
   * @return {boolean}
   */
  isValid(element) {
    return element !== null && element !== undefined;
  }

  /**
   * Return the name of current class.
   *
   * @return {string}
   */
  get className() {
    return this.constructor.name;
  }
}

module.exports = PBase;
