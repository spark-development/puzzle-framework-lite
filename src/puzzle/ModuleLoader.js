"use strict";

const _ = require("lodash");
const path = require("path");

const PState = require("../core/PState");
const PRuntime = require("../core/PRuntime");
const InvalidInstanceType = require("../exceptions/InvalidInstanceType");

/**
 * The module loader of the application. It loads all the modules
 * specified by the developer in the application configuration.
 *
 * @memberOf puzzle
 * @exception core.PState
 * @alias puzzle.modules
 */
class ModuleLoader extends PState {
  /**
   * Constructor of the application.
   */
  constructor() {
    super();

    /**
     * The modules object - stores all the modules loaded into the application.
     *
     * @property {object}
     * @protected
     */
    this._modules = {};
    /**
     * The modules array - stores all the modules loaded into the application.
     *
     * @property {array}
     * @protected
     */
    this._orderedLoad = [];
  }

  /**
   * Registers a module with a given name and instance. It registers new instances only
   * when the application is in preboot state.
   *
   * @param {string} moduleName The name of the module.
   * @param {PRuntime} moduleInstance The instance of the module.
   *
   * @throws InvalidInstanceType
   */
  register(moduleName, moduleInstance) {
    if (this.state === "") {
      if (!this._canBeRunInContext(moduleInstance)) {
        return;
      }
      if (!(moduleInstance instanceof PRuntime)) {
        throw new InvalidInstanceType("PRuntime");
      }

      if (!this.isValid(this._modules[moduleName])) {
        this._orderedLoad.push({
          name: moduleName,
          instance: moduleInstance
        });
        this._modules[moduleName] = this._orderedLoad.length - 1;
      } else {
        this._orderedLoad[this._modules[moduleName]].instance = moduleInstance;
      }
    }
  }

  /**
   * Load the modules defined in the package.json file of the application.
   */
  loadFromPackage() {
    puzzle.app.modules.forEach((module) => {
      let instance = null;
      const instancePaths = this._getModulePath(module);

      puzzle.log.debug("Loading module: [%s].", module);
      for (const instancePath of instancePaths) {
        try {
          instance = require(instancePath);
          this.register(module, new instance());
          return;
        } catch (e) {
          // NOP
        }
      }

      if (!this.isValid(instance)) {
        puzzle.log.error("Unable to load module [%s].", module);
        puzzle.log.error("Unable to find the module in the following paths: %s.",
          instancePaths.join(";"));
      }
    });
  }

  /**
   * Attaches the module loader to the engine.
   *
   * @param {PEngine} engine The reference to engine class
   */
  use(engine) {
    engine.set("modules", this);
  }

  /**
   * Returns a list with paths where to look for a module.
   *
   * @param {string} module Module name.
   *
   * @return {Object}
   */
  _getModulePath(module) {
    const pathList = [];

    pathList.push(module);
    pathList.push(path.join(process.cwd(), "puzzles", module));
    pathList.push(path.join(process.cwd(), "puzzles", module.replace(".", "/")));

    return pathList;
  }

  /**
   * Can the given module be ran in current context (HTTP or CLI)
   *
   * @protected
   * @param {PRuntime} module The module we are currently running.
   */
  _canBeRunInContext(module) {
    if (puzzle.http && module.cliOnly === true) {
      return false;
    }
    return !(puzzle.cli && module.httpOnly === true);
  }

  /**
   * Runs the given stage for all the loaded modules.
   *
   * @protected
   * @param {string} stage The stage we are currently running.
   */
  _runStage(stage) {
    puzzle.log.debug(`Run stage: ${stage}`);
    const loop = stage.toLowerCase().indexOf("shutdown") >= 0 ? _.forEachRight : _.forEach;

    loop(this._orderedLoad, (module) => {
      puzzle.log.debug(`Run stage: [${stage}] for module: [${module.name}]`);
      module.instance[stage]();
    });
    puzzle.log.debug(`Finalized stage: ${stage}`);
  }

  /**
   * The code that executes before the Boot status is achieved.
   */
  beforeBoot() {
    super.beforeBoot();
    this._runStage("beforeBoot");
  }

  /**
   * The code that executes when the Boot status is achieved.
   */
  boot() {
    this.beforeBoot();
    super.boot();
    this._runStage("boot");
    this.afterBoot();
  }

  /**
   * The code that executes after the Boot status is achieved.
   */
  afterBoot() {
    super.afterBoot();
    this._runStage("afterBoot");
  }

  /**
   * The code that executes before the Server Online status is achieved.
   */
  beforeOnline() {
    super.beforeOnline();
    this._runStage("beforeOnline");
  }

  /**
   * The code that executes when the Server Online status is achieved.
   */
  online() {
    this.beforeOnline();
    super.online();
    this._runStage("online");
    this.afterOnline();
  }

  /**
   * The code that executes after the Server Online status is achieved.
   */
  afterOnline() {
    super.afterOnline();
    this._runStage("afterOnline");
  }

  /**
   * The code that executes before the Shutdown status is achieved.
   */
  beforeShutdown() {
    super.beforeShutdown();
    this._runStage("beforeShutdown");
  }

  /**
   * The code that executes when the Shutdown status is achieved.
   */
  shutdown() {
    this.beforeShutdown();
    super.shutdown();
    this._runStage("shutdown");
    this.afterShutdown();
  }

  /**
   * The code that executes after the Shutdown status is achieved.
   */
  afterShutdown() {
    super.afterShutdown();
    this._runStage("afterShutdown");
  }
}

module.exports = ModuleLoader;
