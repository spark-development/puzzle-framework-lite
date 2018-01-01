"use strict";

const _ = require("lodash");
const fs = require("fs");
const log = require("log");
const path = require("path");
const { rotator: rotate } = require("logrotator");

const Version = require("./base/Version");
const Runtime = require("./base/Runtime");
const ToggleRuntime = require("./base/ToggleRuntime");

/**
 * Base class of the Puzzle Framework.
 *
 * @extends base.Runtime
 */
class Puzzle extends Runtime {
  /**
   * Puzzle core constructor.
   *
   * @param {engine} engine A reference to the engine core.
   */
  constructor(engine) {
    super(engine);

    /**
     * A list with all the modules that have to be loaded into the application.
     *
     * @protected
     * @member {base.Runtime[]}
     */
    this._runtimes = [];
  }

  /**
   * Creates the logger object that is going to be used by the application.
   *
   * @param {string} logLevel The level of logging.
   *
   * @return {log}
   */
  initLog(logLevel) {
    const { engine } = this.engine;
    const { log: logConfig } = engine.config.engine;

    if (this.isValid(logConfig.file) && logConfig.file !== "") {
      if (logConfig.rotate === true) {
        rotate.register(logConfig.file, {
          count: logConfig.count,
          size: logConfig.size,
          compress: logConfig.compress
        });
      }
      return new log(
        logLevel,
        fs.createWriteStream(path.resolve(logConfig.file), {
          flags: "a"
        })
      );
    }

    return new log(logLevel);
  }

  /**
   * Initializes the engine of the framework.
   */
  init() {
    const { engine } = this;

    /**
     * Holds the version of the engine.
     *
     * @memberOf engine
     * @type {Version}
     */
    engine.version = new Version();
    /**
     * Holds the name of the current running environment.
     *
     * @memberOf engine
     * @type {string}
     */
    engine.env = process.env.NODE_ENV || "local";

    engine.config = require("./Config");
    engine.config.init();

    engine.commands = (command, obj) => {
      // Nothing happens
    };

    const logLevel = engine.config.engine.debug ? "debug" : engine.config.engine.log.level;
    /**
     * Holds the logger that can be used by the application.
     *
     * @memberOf engine
     * @type {log}
     */
    engine.log = this.initLog(logLevel);

    try {
      engine.config.readEnv(engine.env);

      const newLogLevel = engine.config.engine.debug ? "debug" : engine.config.engine.log.level;
      if (newLogLevel !== logLevel) {
        engine.log = this.initLog(newLogLevel);
      }
    } catch (e) {
      this.log.error(e);
    }

    let { close: closeFunction } = this;
    if (!this.isValid(engine.cli) || engine.cli === false) {
      this.log.info("Application started");
      this.log.info("-".repeat(30));
      this.log.info(`Puzzle Framework Version: ${engine.version.version}`);
      this.log.info(`Environment: ${engine.env}`);
      this.log.info(`Logging level: ${logLevel}`);
      this.log.info("-".repeat(30));
    } else {
      closeFunction = this.closeCLI;
    }

    // do something when app is closing
    process.on("exit", closeFunction.bind(this, {}));

    // catches ctrl+c event
    process.on("SIGINT", closeFunction.bind(this, {
      exit: true
    }));

    // catches uncaught exceptions
    process.on("uncaughtException", closeFunction.bind(this, {
      exit: true
    }));
  }

  /**
   * Application information setter.
   *
   * @param {Object} packageJson The parsed package.json of the application to run.
   */
  set app(packageJson) {
    const { engine } = this;

    /**
     * Holds all the important information about the current running application (name, version, modules, core).
     *
     * @memberOf engine
     * @type {Object}
     */
    engine.application = {
      name: packageJson.name,
      modules: packageJson.puzzle.modules,
      core: packageJson.puzzle.core,
      version: packageJson.version
    };

    /**
     * Holds the version of the application.
     *
     * @memberOf engine
     * @type {base.Version}
     */
    engine.appVersion = new Version(packageJson.version);
  }

  /**
   * Shut downs the server.
   */
  shutdown() {
    if (this.isValid(this.engine.server)) {
      this.log.info("Shutting down the HTTP server");
      this.engine.server.close();
    }
  }

  /**
   * Event called when the application is closed.
   *
   * @param {Object} options The options sent by the closing event.
   * @param {Object} err The errors sent by the closing event.
   */
  close(options, err) {
    if (err) this.log.error(err.stack);
    if (options.exit) process.exit();

    this.shutdown();
    this.log.info("Application closed");
  }

  /**
   * Event called when the CLI framework is closed.
   *
   * @param {Object} options The options sent by the closing event.
   * @param {Object} err The errors sent by the closing event.
   */
  closeCLI(options, err) {
    if (err) this.log.error(err.stack);
    if (options.exit) process.exit();
  }

  /**
   * Add module to the list of modules to be loaded into the system.
   *
   * @param {base.Runtime|base.ToggleRuntime} module The module to be added into the engine runtime.
   */
  pushRuntime(module) {
    if (module instanceof Runtime) {
      this.log.debug(`Loaded Runtime Module: ${module.className}`);
      this._runtimes.push(module);
    }
    if (module instanceof ToggleRuntime) {
      if (!this._checkToggleRuntime(module)) {
        return;
      }

      module.init();
      this.log.debug(`Loaded Runtime Module: ${module.className}`);
      this._runtimes.push(module);
    }

    if (module.prototype instanceof Runtime) {
      const moduleInstance = new module(this.engine);
      this.log.debug(`Loaded Runtime Module: ${moduleInstance.className}`);
      this._runtimes.push(moduleInstance);
    }

    if (module.prototype instanceof ToggleRuntime) {
      const moduleInstance = new module(this.engine);
      if (!this._checkToggleRuntime(moduleInstance)) {
        return;
      }

      moduleInstance.init();
      this.log.debug(`Loaded Runtime Module: ${moduleInstance.className}`);
      this._runtimes.push(moduleInstance);
    }
  }

  /**
   * Checks if a given module is enabled or not.
   *
   * @private
   * @param {base.ToggleRuntime} moduleInstance The instance of the module to be ran.
   *
   * @return {boolean}
   */
  _checkToggleRuntime(moduleInstance) {
    const coreModule = this.engine.application.core[moduleInstance.toggle];

    if (this.isValid(coreModule)) {
      return coreModule;
    }

    return moduleInstance.isEnabled;
  }

  /**
   * Launches all the modules added to the application.
   */
  run() {
    _.each(this._runtimes, (v) => {
      this.log.debug(`Running Runtime Module: ${v.className}`);
      v.run();
      this.log.debug(`Ended Run of Runtime Module: ${v.className}`);
    });
  }
}

module.exports = Puzzle;
