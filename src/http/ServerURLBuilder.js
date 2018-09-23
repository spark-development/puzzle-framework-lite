"use strict";

/** global: puzzle */

const URLBuilder = require("./URLBuilder");

/**
 * Server URL Builder using the configured context path.
 *
 * @alias ServerURLBuilder
 * @memberOf http
 *
 * @param {string} path The path to be correctly built.
 *
 * @return {string}
 */
module.exports = path => `${puzzle.config.http.serverURL}${URLBuilder(path)}`;
