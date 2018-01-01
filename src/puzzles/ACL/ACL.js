"use strict";

const PBase = require("../../base/PBase");
const NoPermission = require("../../exceptions/NoPermission");

/**
 * User's Access Control List.
 *
 * @memberOf ACL
 * @extends base.PBase
 */
class ACL extends PBase {
  /**
   * Constructor for the user's ACL.
   *
   * @param {string[]} permissions The array with permissions.
   */
  constructor(permissions) {
    super();
    /**
     * Permissions list.
     *
     * @protected
     * @member {string[]}
     */
    this._permissions = permissions;
  }

  /**
   * Checks if the user has the given permissions.
   *
   * @param {string} permission The permission to be checked.
   *
   * @return {boolean}
   */
  has(permission) {
    return this._permissions.indexOf(permission) >= 0;
  }

  /**
   * Checks to see if the user is allowed to perform the action.
   *
   * @param {string} permission The permission to be checked.
   * @throws NoPermission
   */
  allowed(permission) {
    if (!this.has(permission)) {
      throw new NoPermission(permission);
    }
  }

  /**
   * Checks if the user can see a part of the screen.
   *
   * @param {string} permission The permission to be checked.
   *
   * @return {boolean}
   */
  canSee(permission) {
    return this.has(permission);
  }

  /**
   * Checks if the user can't see a part of the screen.
   *
   * @param {string} permission The permission to be checked.
   *
   * @return {boolean}
   */
  cantSee(permission) {
    return !this.canSee(permission);
  }
}

module.exports = ACL;
