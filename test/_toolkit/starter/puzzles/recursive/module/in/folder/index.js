"use strict";

const PRuntime = require("../../../../../../../../src/core/PRuntime");

/**
 * Everything related to user authentication will be
 * in this module.
 *
 * @namespace recursive.module.in.folder
 */

/**
 * Initialization class for the recursive.module.in.folder module.
 *
 * @extends core.PRuntime
 * @memberOf recursive.module.in.folder
 */
class RecursiveModuleInFolder extends PRuntime {
  afterBoot() {
    puzzle.module = "RecursiveModuleInFolder"
  }
}

module.exports = RecursiveModuleInFolder;
