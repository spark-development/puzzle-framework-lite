"use strict";

const consign = require("consign");

const PConfig = require("../core/PConfig");

/**
 * Static configuration.
 *
 * @memberOf puzzle
 * @extends core.PConfig
 * @alias puzzle.config
 */
class StaticConfig extends PConfig {
  /**
   * Constructor of the Static Config class.
   */
  constructor() {
    super();
    this.clear();
    this._config = { ...require("../defaults/config.js") };
    this._reloadProperties();
  }

  /**
   * Initializes the configuration.
   */
  init() {
    const configFromFile = {};
    consign({
      cwd: process.cwd(),
      verbose: false,
      extensions: [".js", ".json", ".node"],
      loggingType: "info"
    })
      .include(`./config`)
      .into(configFromFile);

    this.load(configFromFile.config);
  }

  /**
   * Initializes the configuration module on engine.
   *
   * @param {PEngine} engine The reference to engine class
   */
  use(engine) {
    engine.set("config", this);
    engine.config.init();
    engine.config.readEnv();
  }
}

module.exports = StaticConfig;
