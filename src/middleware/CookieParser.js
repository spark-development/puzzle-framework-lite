"use strict";

/** global: puzzle */

const cookieParser = require("cookie-parser");

/**
 * Cookie Parser wrapper.
 *
 * @alias CookieParser
 * @memberOf middleware
 */
module.exports = () => {
  puzzle.http.use(cookieParser());
};
