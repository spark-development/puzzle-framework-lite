"use strict";

/** global: puzzle */

/**
 * URL Builder using the configured context path.
 *
 * @alias URLBuilder
 * @memberOf http
 *
 * @param {string} path The path to be correctly built.
 *
 * @return {string}
 */
module.exports = (path) => `${puzzle.config.http.contextPath}/${path}`.replace(/[/]+/g, "/");
