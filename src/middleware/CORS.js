"use strict";

const cors = require("cors");

/**
 * CORS wrapper.
 *
 * @alias CORS
 * @memberOf middleware
 *
 * @param {engine} engine Reference to engine core.
 */
module.exports = (engine) => {
  const { app, config } = engine;

  app.use(cors({
    credentials: true,
    origin: config.http.cors
  }));
};
