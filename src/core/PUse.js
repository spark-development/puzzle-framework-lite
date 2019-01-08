"use strict";

const PObject = require("./PObject");

/**
 * Class that can be used to extend the framework with functionality
 *
 * @memberOf core
 * @extends core.PObject
 */
class PUse extends PObject {
  /**
   * Called by engine when .use method is used.
   *
   * @param {PEngine} engine The reference to engine class.
   */
  use(engine) {

  }
}

module.exports = PUse;
