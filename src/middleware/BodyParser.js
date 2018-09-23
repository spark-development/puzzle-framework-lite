"use strict";

/** global: puzzle */

const bodyParser = require("body-parser");

/**
 * Body Parser wrapper.
 *
 * @alias BodyParser
 * @memberOf middleware
 */
module.exports = () => {
  puzzle.http.use(bodyParser.json());
  puzzle.http.use(bodyParser.urlencoded({
    extended: true
  }));
};
