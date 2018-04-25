"use strict";

const packageInfo = require("../../package.json");

const PObject = require("./PObject");

/**
 * Version information class.
 *
 * @memberOf core
 * @extends core.PObject
 */
class PVersion extends PObject {
  /**
   * Creates an instance of the version class.
   *
   * @param {string} version The version string (eg. 0.1.0).
   */
  constructor(version) {
    super();

    /**
     * @private
     */
    this._major = 0;
    /**
     * @private
     */
    this._minor = 0;
    /**
     * @private
     */
    this._patch = 0;

    this.version = version || packageInfo.version;
  }

  /**
   * Returns the version string.
   *
   * @type {string}
   */
  get version() {
    return `${this._major}.${this._minor}.${this._patch}`;
  }

  /**
   * Sets the version of the application.
   *
   * @param {string} value The version string.
   */
  set version(value) {
    const versionString = value.split(".");

    this._major = parseInt(versionString[0]);
    this._minor = parseInt(versionString[1]);
    this._patch = parseInt(versionString[2]);
  }
}

module.exports = PVersion;
