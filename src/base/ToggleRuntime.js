"use strict";

const PObject = require("./PObject");

/**
 * Feature switch runtime base object.
 *
 * A module base class. Using this you can load various functionalities in the engine core.
 * The functionalities defined as ToggleRuntime can be enabled/disabled when needed from
 * the puzzle.core attribute of the projects package.json file
 *
 * @extends base.PObject
 * @memberOf base
 * @abstract
 */
class ToggleRuntime extends PObject {
  /**
   * ToggleRuntime class constructor.
   *
   * @param {engine} engine A reference to the engine core.
   * @param {string} toggleName The name of the toggle switch.
   */
  constructor(engine, toggleName) {
    super(engine);

    /**
     * Name of the toggle switch.
     *
     * @member {string}
     */
    this.toggle = toggleName;

    /**
     * Is the feature enabled by default?
     *
     * @member {boolean}
     * @protected
     */
    this._enabled = true;
  }

  /**
   * Checks if the module is enabled by default or not.
   *
   * @type {boolean}
   */
  get isEnabled() {
    return this._enabled;
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

module.exports = ToggleRuntime;
