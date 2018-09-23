"use strict";

/** global: puzzle */

const cookieParser = require("cookie-parser");
const session = require("express-session");

/**
 * Session handing wrapper.
 *
 * @alias Session
 * @memberOf middleware
 */
module.exports = () => {
  const { http, config } = puzzle;

  switch (config.session.store) {
    case "memory":
      http.use(session({
        cookieParser: cookieParser(),
        key: config.session.key,
        secret: config.session.secret,
        resave: false,
        saveUninitialized: true
      }));
      break;
  }
};
