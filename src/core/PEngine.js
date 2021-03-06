"use strict";

const _ = require("lodash");

const PObject = require("./PObject");
const PUse = require("./PUse");
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

    /**
     * Holds the modules loaded directly on the engine.
     *
     * @property {Object}
     * @protected
     */
    this._modules = {};
    this._init();
  }

  /**
   * Is the lite version of the framework used?
   *
   * @return {boolean}
   */
  get lite() {
    return global.puzzleLight;
  }

  /**
   * Getter for engine version.
   *
   * @return {PVersion}
   */
  get version() {
    return this._version;
  }

  /**
   * Setter for engine version.
   *
   * @param {*} packageJson The frameworks package.json file
   */
  set version(packageJson) {
    this._version = new PVersion(packageJson.version);
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
      name: packageJson.name || this._app.name,
      version: packageJson.version || this._app.version,
      modules: packageJson.puzzles || packageJson.modules || []
    };

    this._appVersion = new PVersion(packageJson.version);
  }

  /**
   * Getter for application version.
   *
   * @return {PVersion}
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
   * Returns the logger instance.
   *
   * @return {object|null}
   */
  get log() {
    return this.isValid(this._logger)
      ? this._logger.logger || this._logger
      : null;
  }

  /**
   * Sets the logger instance.
   *
   * @param {object} logger The logger object.
   */
  set log(logger) {
    this._logger = logger;
  }

  /**
   * Returns the log level used by the logger.
   *
   * @return {string}
   */
  get logLevel() {
    return this.isValid(this._logger)
      ? this._logger.logLevel || ""
      : "";
  }

  /**
   * Module getter method.
   *
   * @param {string} module The name of the module.
   *
   * @return {*}
   */
  get(module) {
    return this.isValid(this._modules[module])
      ? this._modules[module]
      : undefined;
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
      get: () => this.get(moduleName),
      configurable: true
    });
  }

  /**
   * Module unsetter method. Deletes the getter function for the module.
   *
   * @param {string} moduleName The name of the module to be added to the engine.
   */
  unset(moduleName) {
    if (!this.isValid(this._modules[moduleName])) {
      return;
    }
    delete this._modules[moduleName];
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
      version: this._version.version,
      modules: []
    };
    this._logger = null;
  }

  /**
   * Returns the module you need to use. Can be extended to use files relative
   * to current project/framework.
   *
   * @param {string} moduleName The module name.
   *
   * @return {*}
   */
  import(moduleName) {
    return require(`${__dirname}/../${moduleName}`);
  }

  /**
   * Use the given module. Attach some elements to the engine.
   *
   * @param {object|function} module The module to be used.
   */
  use(module) {
    if (!this.isValid(module) || Array.isArray(module)) {
      return;
    }
    if (typeof module === "function" && !this.isValid(module.prototype)) {
      module(this);
      return;
    }
    if (_.isObject(module)
      && (module.prototype instanceof PUse || !!(new module()).use)) {
      const instance = new (module)();
      instance.use(this);
    }
  }
}

module.exports = PEngine;
