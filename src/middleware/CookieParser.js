"use strict";

const cookieParser = require("cookie-parser");

/**
 * Cookie Parser wrapper.
 *
 * @alias CookieParser
 * @memberOf middleware
 *
 * @param {engine} engine Reference to engine core.
 */
module.exports = (engine) => {
  engine.app.use(cookieParser());
};
