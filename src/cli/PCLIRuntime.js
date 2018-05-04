"use strict";

const PRuntime = require("../core/PRuntime");

/**
 * CLI Runtime class to be used in the framework.
 *
 * @memberOf core
 * @extends core.PObject
 * @abstract
 */
class PCLIRuntime extends PRuntime {
  /**
   * Constructor of the CLI Runtime class.
   */
  constructor() {
    super();
    this._cliOnly = true;
  }
}

module.exports = PCLIRuntime;
