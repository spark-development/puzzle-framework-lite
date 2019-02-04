"use strict";

const PEnum = require("../core/PEnum");

/**
 * To be used when you want a sealed and frozen enum.
 *
 * @memberOf {utils}
 * @alias {PSealEnum}
 *
 * @param {...*} enumElements The elements used in the enum.
 */
module.exports = (...enumElements) => {
  const enumObject = new PEnum(...enumElements);

  return Object.freeze(enumObject);
};
