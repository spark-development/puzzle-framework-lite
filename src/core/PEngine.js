"use strict";

const PObject = require("./PObject");
const PVersion = require("./PVersion");

/**
 * Engine base object.
 *
 * It defines some base elements and an extension point through the get/set methods. When you add
 * an extension point, the engine class defines a getter property for it to enable easy access to it.
 *
 * @memberOf core
 * @extends core.PObject
 */
class PEngine extends PObject {
  /**
   * Constructor of the PEngine class. Initializes some base elements like: version, app, env etc.
   */
  constructor() {
    super();

    this._modules = {};
    this._init();
  }

  /**
   * Getter for engine version.
   *
   * @return {core.PVersion}
   */
  get version() {
    return this._version;
  }

  /**
   * Getter for application information.
   *
   * @return {object}
   */
  get app() {
    return this._app;
  }

  /**
   * Setter for app property. It also initializes the application version.
   *
   * @param {object} packageJson Package.json content.
   */
  set app(packageJson) {
    this._app = {
      name: packageJson.name,
      version: packageJson.version
    };

    this._appVersion = new PVersion(packageJson.version);
  }

  /**
   * Getter for application version.
   *
   * @return {core.PVersion}
   */
  get appVersion() {
    return this._appVersion;
  }

  /**
   * Getter for application environment.
   *
   * @return {string}
   */
  get env() {
    return this.isValid(process.env.NODE_ENV) ? process.env.NODE_ENV : "local";
  }

  /**
   * Module getter method.
   *
   * @param {string} module The name of the module.
   *
   * @return {*|null}
   */
  get(module) {
    return this.isValid(this._modules[module]) ?
      this._modules[module] :
      null;
  }

  /**
   * Module setter method. Creates a getter function for the module set.
   *
   * @param {string} moduleName The name of the module to be added to the engine.
   * @param {*} moduleInstance The instance of the module to be added.
   */
  set(moduleName, moduleInstance) {
    this._modules[moduleName] = moduleInstance;
    Object.defineProperty(this, moduleName, {
      get: () => this._modules[moduleName]
    });
  }

  /**
   * Initializes the class.
   *
   * @protected
   */
  _init() {
    this._version = new PVersion();
    this.app = {
      name: "Puzzle Framework | Lite",
      version: this._version.version
    };
  }

  /**
   * Returns the module you need to use.
   *
   * @param {string} moduleName The module name.
   *
   * @return {*}
   */
  import(moduleName) {
    return require(`../${moduleName}`);
  }
}

module.exports = PEngine;
