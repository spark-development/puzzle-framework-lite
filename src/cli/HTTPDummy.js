"use strict";

const HTTP = require("../http/HTTP");

/**
 * Dummy runtime for HTTP module
 *
 * @extends base.Runtime
 * @memberOf cli
 */
class HTTPDummy extends HTTP {
  /**
   * Runs the dummy HTTP runtime for CLI.
   */
  run() {

  }
}

module.exports = HTTPDummy;
