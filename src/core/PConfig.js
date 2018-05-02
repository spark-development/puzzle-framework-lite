"use strict";

const fs = require("fs");
const path = require("path");

const PObject = require("./PObject");

/**
 * Configuration datastore class.
 *
 * @memberOf core
 * @extends core.PObject
 */
class PConfig extends PObject {
  /**
   * Constructor of the PConfig class.
   */
  constructor() {
    super();

    /**
     * Configuration datastore object
     *
     * @property {object}
     * @protected
     */
    this._config = {};

    /**
     * Which elements cannot be overwritten.
     *
     * @property {array}
     * @protected
     */
    this._unallowed = [
      "_config",
      "isEmpty",
      "isValid",
      "className",
      "init",
      "load",
      "readEnv",
      "clear",
      "get",
      "delete",
      "_reloadProperties"
    ];
  }

  /**
   * Let's the user know if the datastore is empty.
   *
   * @return {boolean}
   */
  get isEmpty() {
    return this.isValid(this._config) && Object.keys(this._config).length === 0;
  }

  /**
   * Returns the keys of the configuration elements stored in the the datastore.
   *
   * @return {array}
   */
  get keys() {
    return Object.keys(this._config);
  }

  /**
   * Initializes the configuration.
   */
  init() {

  }

  /**
   * Loads some configuration elements into the datastore.
   *
   * @param {object} configElements The configuration elements that need to be loaded.
   */
  load(configElements) {
    this._config = Object.assign(this._config, configElements);
    this._reloadProperties();
  }

  /**
   * Clears the datastore.
   */
  clear() {
    Object.keys(this._config).forEach((key) => {
      delete this[key];
    });
    this._config = {};
  }

  /**
   * Returns the element at the given key.
   *
   * @param {string} key The key for which we need a value.
   *
   * @return {*}
   */
  get(key) {
    return this.isValid(this._config[key]) ? this._config[key] : undefined;
  }

  /**
   * Sets a value for a given key. Also, defines a getter/setter for the key.
   *
   * @param {string} key The key for which the value is set.
   * @param {*} value The value to be set.
   */
  set(key, value) {
    if (this._unallowed.includes(key)) {
      return;
    }
    this._config[key] = value;
    Object.defineProperty(this, key, {
      get: () => this.get(key),
      set: newValue => this.set(key, newValue),
      configurable: true
    });
  }

  /**
   * Deletes a key from the datastore.
   *
   * @param {string} key The key to be deleted.
   */
  delete(key) {
    if (this.isValid(this._config[key])) {
      delete this._config[key];
      delete this[key];
    }
  }

  /**
   * Reads the environment and loads the data into the system.
   *
   * @param [{string}] suffix If the environment file has a suffix.
   */
  readEnv(suffix) {
    if (!this.isValid(suffix)) {
      suffix = "";
    }

    const envConfigFile = path.resolve(process.cwd(), `.env${suffix}`);
    if (!fs.existsSync(envConfigFile)) {
      return;
    }

    const envConfig = fs.readFileSync(envConfigFile, "utf-8");
    this._config = Object.assign(this._config, JSON.parse(envConfig));
    this._reloadProperties();
  }

  /**
   * Reloads the properties defined in the datastore as getter/setters for the current object.
   *
   * @protected
   */
  _reloadProperties() {
    Object.keys(this._config).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => this.get(key),
        set: newValue => this.set(key, newValue),
        configurable: true
      });
    });
  }
}

module.exports = PConfig;
