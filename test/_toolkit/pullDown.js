"use strict";

const _ = require("lodash");

/**
 * Hook that brings the server down.
 *
 * @alias test.hooks.pullDown
 */
module.exports = (puzzle) => {
  puzzle.shutdown();
};
