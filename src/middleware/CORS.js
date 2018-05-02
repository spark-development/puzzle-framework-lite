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
module.exports = () => {
  const { http, config } = puzzle;

  http.use(cors({
    credentials: true,
    origin: config.http.cors
  }));
};
