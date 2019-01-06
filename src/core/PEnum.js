"use strict";

const PObject = require("./PObject");
const InvalidParameterType = require("../exceptions/InvalidParameterType");

/**
 * Puzzle Framework enumeration class.
 *
 * @memberOf core
 * @extends core.PObject
 */
class PEnum extends PObject {
  /**
   * Enumeration constructor.
   *
   * @param {...*} enumElements The elements of the enumeration.
   * @throws InvalidParameterType
   */
  constructor(...enumElements) {
    super();

    /**
     * Keeps the length of the enum.
     *
     * @protected
     * @property {number}
     */
    this._length = 0;

    /**
     * Keeps the keys of the enum.
     *
     * @protected
     * @property {Array}
     */
    this._keys = [];

    if (enumElements.length === 1) {
      this._checkObject(enumElements.pop());
      return;
    }

    this._checkStrings(enumElements);
    this._keys = Object.freeze(this._keys);
  }

  /**
   * Returns the length of the enumeration.
   *
   * @return {number}
   */
  get length() {
    return this._length;
  }

  /**
   * Returns the keys of the enumeration.
   *
   * @return {number}
   */
  get keys() {
    return this._keys;
  }

  /**
   * Constructs the enumeration based on a key-value pair.
   *
   * @param {Object} enumElements The elements of the enumeration.
   * @throws InvalidParameterType
   */
  _checkObject(enumElements) {
    if (typeof enumElements === "string" || enumElements instanceof Array) {
      this._checkStrings(enumElements);
      return;
    }

    const keys = Object.keys(enumElements);
    this._checkArrayForStrings(keys);
    this._registerObject(enumElements);
  }

  /**
   * Constructs the enumeration based on a string array.
   *
   * @param {Array} enumElements The elements of the enumeration.
   * @throws InvalidParameterType
   */
  _checkStrings(enumElements) {
    this._checkArrayForStrings(enumElements);
    this._registerStrings(enumElements);
  }

  /**
   * Checks if the keys of the enumeration are strings.
   *
   * @param {Array} elements The elements of the enumeration.
   * @throws InvalidParameterType
   */
  _checkArrayForStrings(elements) {
    elements.forEach((element) => {
      if (typeof element !== "string") {
        throw new InvalidParameterType();
      }
    });
  }

  /**
   * Registers the string elements of the enumeration.
   *
   * @param {Array} enumElements The elements of the enumeration.
   */
  _registerStrings(enumElements) {
    this._length = enumElements.length;
    enumElements.forEach((key) => {
      const value = key.toUpperCase();
      const label = value.replace(" ", "_");
      this._keys.push(label);
      Object.defineProperty(this, label, {
        get: () => value,
        configurable: false
      });
    });
  }

  /**
   * Registers the key-value pairs of the enumeration.
   *
   * @param {Object} enumElements The elements of the enumeration.
   */
  _registerObject(enumElements) {
    const keys = Object.keys(enumElements);
    this._length = keys.length;

    keys.forEach((key) => {
      const value = enumElements[key];
      const label = key.toUpperCase()
        .replace(" ", "_");
      this._keys.push(label);
      Object.defineProperty(this, label, {
        get: () => value,
        configurable: false
      });
    });
  }
}

module.exports = PEnum;
