"use strict";

/** global: puzzle */

const cors = require("cors");

/**
 * CORS wrapper.
 *
 * @alias CORS
 * @memberOf middleware
 */
module.exports = () => {
  const { http, config } = puzzle;

  http.use(cors({
    credentials: true,
    origin: config.http.cors
  }));
};
