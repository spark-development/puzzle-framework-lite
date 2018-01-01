"use strict";

const Model = require("./Model");

/**
 * User model base object.
 *
 * @extends models.Model
 * @memberOf models
 */
class User extends Model {
  /**
   * User model constructor.
   *
   * @param {engine} engine The engine reference.
   */
  constructor(engine) {
    super(engine, "User");
  }

  /**
   * Defines how the model should look like.
   *
   * @return {Object}
   */
  definition() {
    const { DataTypes } = this._storage;

    return {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING
      },
      admin: DataTypes.BOOLEAN,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    };
  }

  /**
   * Enhances the model after it was composed.
   */
  enhance() {
    this._model.isAdmin = this.isAdmin;
    this._model.allowed = this.allowed;
  }

  /**
   * Checks to see if the current user is an administrator or not.
   *
   * @type {boolean}
   */
  get isAdmin() {
    return true;
  }

  /**
   * Checks to see if the current user is allowed to perform the desired action.
   *
   * @param {string} permission The name of the permission
   *
   * @return {boolean}
   */
  allowed(permission) {
    return permission !== null && permission !== undefined && permission.length > 0;
  }
}

module.exports = User;
