"use strict";

const InMemoryTable = require("./InMemoryTable");
const StorageEngine = require("./StorageEngine");

/**
 * In memory storage engine for Models used in Puzzle Framework.
 *
 * @extends models.StorageEngine
 * @memberOf models
 */
class InMemoryStorage extends StorageEngine {
  /**
   * Constructor of the in memory storage that is going to be used by the framework.
   *
   * @param {engine} engine The reference to the engine.
   */
  constructor(engine) {
    super(engine);
    /**
     * The map with models defined in the framework.
     *
     * @protected
     * @member {Object}
     */
    this._models = {};

    /**
     * Available data types for in memory models.
     *
     * @member {Object}
     */
    this.DataTypes = {
      INTEGER: "number",
      DECIMAL: "number",
      STRING: "string",
      TEXT: "string",
      BOOLEAN: "boolean",
      DATE: "string"
    };
  }

  /**
   * Runs the definition of the model and creates the final class that can
   * be later used to query the storage for the current model name.
   *
   * @param {string} entity The name of the entity to be defined.
   * @param {Object} definition The definition of the entity.
   * @param {Object} options The options that will be passed to the definition.
   *
   * @return {*}
   */
  definition(entity, definition, options) {
    this._models[entity] = new InMemoryTable(entity, definition);
    return this._models[entity];
  }
}

module.exports = InMemoryStorage;
