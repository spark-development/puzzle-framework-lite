"use strict";

const bodyParser = require("body-parser");

/**
 * Body Parser wrapper.
 *
 * @alias BodyParser
 * @memberOf middleware
 *
 * @param {engine} engine Reference to engine core.
 */
module.exports = (engine) => {
  engine.app.use(bodyParser.json());
  engine.app.use(bodyParser.urlencoded({
    extended: true
  }));
};
