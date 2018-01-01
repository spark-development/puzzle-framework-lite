"use strict";

const PBase = require("./PBase");

/**
 * This is the base class for the engine related classes of the Puzzle Framework.
 *
 * @memberOf base
 * @extends base.PBase
 */
class PObject extends PBase {
  /**
   * Constructor of the PObject class.
   *
   * @param {engine} engine A reference to the engine core.
   */
  constructor(engine) {
    super();
    /**
     * Reference to the engine core.
     *
     * @member {engine}
     */
    this.engine = engine;
  }

  /**
   * Offers application wide text translation (to be used only with CLI framework).
   *
   * @param {...*} args Arguments passed to the __ of the i18n library.
   *
   * @return {string}
   */
  __(...args) {
    if (this.isValid(this.engine.cli) && this.isValid(this.engine.i18n)) {
      return this.engine.i18n.__(...args);
    }

    return [...args].join(" ");
  }

  /**
   * Returns the instance of the logger class.
   *
   * @return {log}
   */
  get log() {
    return this.engine.log;
  }
}

module.exports = PObject;
