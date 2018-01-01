"use strict";

const cookieParser = require("cookie-parser");
const session = require("express-session");

/**
 * Session handing wrapper.
 *
 * @alias Session
 * @memberOf middleware
 *
 * @param {engine} engine Reference to engine core.
 */
module.exports = (engine) => {
  const { app, config } = engine;

  switch (config.session.store) {
    case "memory":
      app.use(session({
        cookieParser: cookieParser(),
        key: config.session.key,
        secret: config.session.secret,
        resave: false,
        saveUninitialized: true
      }));
      break;
  }
};
