"use strict";

const PRuntime = require("../../../../../src/core/PRuntime");

/**
 * Everything related to user authentication will be
 * in this module.
 *
 * @namespace sample.test
 */

/**
 * Initialization class for the sample.test module.
 *
 * @extends core.PRuntime
 * @memberOf sample.test
 */
class SampleTest extends PRuntime {
  afterBoot() {
    puzzle.module = "SampleTest"
  }
}

module.exports = SampleTest;
