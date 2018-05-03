"use strict";

const PRuntime = require("../core/PRuntime");

/**
 * Server Runtime class to be used in the framework.
 *
 * @memberOf core
 * @extends core.PObject
 * @abstract
 */
class PServerRuntime extends PRuntime {
  constructor() {
    super();
    this._httpOnly = true;
  }
}

module.exports = PServerRuntime;
