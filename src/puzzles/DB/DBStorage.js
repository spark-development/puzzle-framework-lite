"use strict";

const { DataTypes } = require("sequelize");

const StorageEngine = require("../../models/StorageEngine");

/**
 * The model definition class for a Puzzle Model.
 *
 * @extends models.StorageEngine
 * @memberOf DB
 */
class DBStorage extends StorageEngine {
  constructor(engine) {
    super(engine);

    this.DataTypes = DataTypes;

    /**
     * A reference to the sequelize instance.
     *
     * @member {sequelize}
     */
    this.sequelize = engine.db;
  }

  /**
   * Runs the definition of the model and creates the final class that can
   * be later used to query the storage for the current model name.
   *
   * @param {string} entity The name of the entity to be defined.
   * @param {Object} definition The definition of the entity.
   * @param {Object} options The options that will be passed to the definition.
   *
   * @return {Object}
   */
  definition(entity, definition, options) {
    return this.sequelize.define(entity, definition, options);
  }
}

module.exports = DBStorage;
