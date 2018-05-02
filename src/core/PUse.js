"use strict";

const PObject = require("./PObject");

/**
 * This is the base class of the Puzzle Framework.
 *
 * @memberOf core
 * @extends core.PObject
 */
class PUse extends PObject{
  /**
   * Called by engine when .use method is used.
   */
  use(engine) {

  }
}

module.exports = PUse;
