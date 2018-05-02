"use strict";

const _ = require("lodash");
const consign = require("consign");
const fs = require("fs");
const path = require("path");

/**
 * Configuration module.
 *
 * It reads and loads the configuration from the config folder. It also enables the developer possibility to load
 * some configuration based on the current runtime.
 *
 * @namespace engine.config
 */
let config = require("./default.config");

/**
 * Initialises the config variable with data from the config folder.
 *
 * @memberOf engine.config
 */
config.init = () => {
  consign({
    cwd: process.cwd(),
    verbose: false,
    extensions: [".js", ".json", ".node"],
    loggingType: "info"
  })
    .include(`./config`)
    .into(config);

  _.extend(config, config.config);
  delete config.config;
};

/**
 * Reads the configuration for the given environment.
 *
 * @memberOf engine.config
 * @param [{string}] [env] The environment name.
 */
config.readEnv = (env) => {
  const envConfigFile = path.resolve(process.cwd(), `.env.${env}`);
  if (!fs.existsSync(envConfigFile)) {
    return;
  }

  let envConfig = fs.readFileSync(envConfigFile, "utf-8");
  envConfig = JSON.parse(envConfig);
  _.merge(config, envConfig);
};

/**
 * Resets the values of the config variables.
 *
 * @memberOf engine.config
 */
config.reset = () => {
  config.init();
};

/**
 * Load extra configuration elements.
 *
 * @memberOf engine.config
 * @param {string} file The file containing the permissions.
 */
config.load = (file) => {
  const val = require(file);

  config = _.extend(config, val);
};

module.exports = config;
