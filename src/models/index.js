"use strict";

const Runtime = require("../base/Runtime");

const InMemory = require("./InMemoryStorage");
const Model = require("./Model");
const StorageEngine = require("./StorageEngine");

/**
 * Base framework Models namespace definition.
 *
 * @namespace models
 */

/**
 * Models runtime.
 *
 * @extends base.Runtime
 * @memberOf models
 */
class ModelsRuntime extends Runtime {
  /**
   * Initializes the Models system.
   */
  init() {
    /**
     * A list with all the models available in the application.
     *
     * @member {Array<string,models.Model>}
     * @private
     */
    this._models = {};

    /**
     * The storage engine to be used in the application.
     *
     * @member {models.StorageEngine}
     * @private
     */
    this._storage = new InMemory(this.engine);

    /**
     * Holder of all model related information.
     *
     * @alias engine.models
     * @memberOf engine
     * @type {models.ModelsRuntime}
     */
    this.engine.models = this;
  }

  /**
   * Performs some actions.
   */
  run() {

  }

  /**
   * Sets the storage engine to be used by the framework.
   *
   * @param {models.StorageEngine} storage The storage engine to be used.
   */
  set storage(storage) {
    if (storage instanceof StorageEngine) {
      this._storage = storage;
      return;
    }

    if (storage.prototype instanceof StorageEngine) {
      const se = new storage(this.engine);
      this._storage = se;
    }
  }

  /**
   * Returns the storage engine to be used in the framework.
   *
   * @return {models.StorageEngine}
   */
  get storage() {
    return this._storage;
  }

  /**
   * Pushes a model onto the engine, to be used throughout the framework.
   *
   * @param {model.Model} model The model to be added into the framework.
   */
  push(model) {
    let m;
    if (model instanceof Model) {
      m = model;
    } else if (model.prototype instanceof Model) {
      m = new model(this.engine);
    }

    if (!m.isComposed) {
      m.compose();
    }
    this._models[m.entity] = m;
  }

  /**
   * Returns the model from the application.
   *
   * @param {string} entity The model name to be fetched.
   *
   * @return {model.Model}
   */
  get(entity) {
    return this._models[entity].model;
  }
}

module.exports = ModelsRuntime;
