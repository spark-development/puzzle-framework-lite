"use strict";

/**
 * To be used when you need to bundle multiple modules in a
 * bigger module.
 *
 * @memberOf {utils}
 * @alias {bundle}
 *
 * @param {string} moduleName The name of the module.
 * @param {Object} moduleClass The module that needs to be bundled.
 */
module.exports = (moduleName, moduleClass) => {
  puzzle.modules.register(moduleName, new moduleClass());
};
