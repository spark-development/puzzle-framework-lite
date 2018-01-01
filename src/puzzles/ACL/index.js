"use strict";

const ToggleRuntime = require("../../base/ToggleRuntime");

/**
 * Access Control Library.
 *
 * @namespace ACL
 */

/**
 * Access Control Library main entry point.
 *
 * This functionality is disabled by default. To enable it, you must set the
 * puzzle.core.acl attribute in package.json to true.
 *
 * @extends base.ToggleRuntime
 * @memberOf ACL
 */
class ACLMain extends ToggleRuntime {
  constructor(engine) {
    super(engine, "acl");
    this._enabled = false;
  }

  /**
   * Initializes the ACL system.
   */
  init() {
    this.engine.acl = require("./ACL");
  }

  /**
   * Performs some actions.
   */
  run() {

  }
}

module.exports = ACLMain;
