"use strict";

const consign = require("consign");

const PConfig = require("../core/PConfig");

/**
 * Static configuration.
 *
 * @memberOf puzzle
 * @extends core.PConfig
 */
class StaticConfig extends PConfig {
  /**
   * Constructor of the PConfig class.
   */
  constructor() {
    super();
    this._config = require("../defaults/config.js");
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
}

module.exports = StaticConfig;
