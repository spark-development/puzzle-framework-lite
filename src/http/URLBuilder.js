"use strict";

/**
 * URL Builder using the configured context path.
 *
 * @alias URLBuilder
 * @memberOf http
 *
 * @param {engine} engine Reference to engine core.
 * @param {string} path The path to be correctly built.
 *
 * @return {string}
 */
module.exports = (engine, path) => `${engine.config.http.contextPath}/${path}`.replace("//", "/");
