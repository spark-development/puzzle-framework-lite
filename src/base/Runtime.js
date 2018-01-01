"use strict";

const PObject = require("./PObject");

/**
 * Runtime base object.
 *
 * A module base class. Using this you can load various functionalities in the engine core.
 *
 * @extends base.PObject
 * @memberOf base
 * @abstract
 */
class Runtime extends PObject {
  /**
   * Runtime class constructor.
   *
   * @param {engine} engine A reference to the engine core.
   */
  constructor(engine) {
    super(engine);
    this.init();
  }

  /**
   * Performs some initialisations for the current runtime class.
   *
   * @abstract
   */
  init() {

  }

  /**
   * Performs some actions defined for the current runtime class.
   *
   * @abstract
   */
  run() {

  }
}

module.exports = Runtime;
