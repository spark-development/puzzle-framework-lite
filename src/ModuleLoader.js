"use strict";

const _ = require("lodash");

const Runtime = require("./base/Runtime");

/**
 * Module loader class.
 *
 * Loads all the modules defined by the application in package.json under the puzzle.modules attribute.
 *
 * @extends base.Runtime
 */
class ModuleLoader extends Runtime {
  /**
   * Constructor of the Module Loader
   *
   * @param {engine} engine Reference to the engine core.
   */
  constructor(engine) {
    super(engine);
    /**
     * A map with all the modules loaded into the application.
     *
     * @member {Object.<string, Object>}
     */
    this.modules = {};

    /**
     * Gets all modules or the module with the given name.
     *
     * @alias engine.modules
     * @memberOf engine
     * @param {string} [name] The name of the module.
     *
     * @return {Object[]|Object|function}
     */
    this.engine.modules = (name) => {
      if (!this.isValid(name) || name === "") {
        return this.modules;
      }
      return this.get(name);
    };
  }

  /**
   * Loads all the modules into the application.
   */
  run() {
    _.forOwn(this.engine.application.modules, (module) => {
      try {
        this.engine.log.debug("Loading module: [%s].", module);
        this.modules[module] = require(module)(this.engine);
        this.engine.log.debug("Module [%s] was loaded successfully.", module);
      } catch (e1) {
        try {
          this.modules[module] = require(_.join([process.cwd(), "puzzles", module], "/"))(this.engine);
          this.engine.log.debug("Module [%s] was loaded successfully.", module);
        } catch (e2) {
          this.engine.log.error(e2);
          this.engine.log.error("Unable to load module [%s].", module);
        }
      }
    });

    this.engine.middlewares("run");
  }

  /**
   * Returns the instance of the module.
   *
   * @param {string} module - The name of the module
   * @return {Object|function}
   */
  get(module) {
    return this.modules[module];
  }
}

module.exports = ModuleLoader;
