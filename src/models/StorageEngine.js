"use strict";

const PObject = require("../base/PObject");

/**
 * The base of the storage engine for Models used in Puzzle Framework.
 *
 * @extends base.PObject
 * @memberOf models
 * @abstract
 */
class StorageEngine extends PObject {
  constructor(engine) {
    super(engine);

    /**
     * The data types available to define models.
     *
     * @member {Object}
     */
    this.DataTypes = {};
  }

  /**
   * Runs the definition of the model and creates the final class that can
   * be later used to query the storage for the current model name.
   *
   * @abstract
   * @param {string} entity The name of the entity to be defined.
   * @param {Object} definition The definition of the entity.
   * @param {Object} options The options that will be passed to the definition.
   *
   * @return {*}
   */
  definition(entity, definition, options) {
  }
}

module.exports = StorageEngine;
