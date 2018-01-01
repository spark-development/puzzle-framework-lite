"use strict";

const PObject = require("../base/PObject");

/**
 * The base class for a Puzzle Model.
 *
 * @extends base.PObject
 * @memberOf models
 * @abstract
 */
class Model extends PObject {
  /**
   * Model constructor.
   *
   * @param {engine} engine The engine reference.
   * @param {string} entity The name of the entity.
   */
  constructor(engine, entity) {
    super(engine);

    /**
     * The name of the entity.
     *
     * @member {string}
     */
    this.entity = entity;

    /**
     * Storage engine reference.
     *
     * @protected
     * @member {models.StorageEngine}
     */
    this._storage = engine.models.storage;

    /**
     * The model class returned by the storage engine.
     *
     * @protected
     * @member {Object}
     */
    this._model = null;

    /**
     * Checks if the object is composed or not.
     */
    this.isComposed = false;
  }

  /**
   * Defines how the model should look like.
   *
   * @abstract
   * @return {Object}
   */
  definition() {

  }

  /**
   * Enhances the model after it was composed.
   *
   * @abstract
   */
  enhance() {

  }

  /**
   * Returns various options that can be passed to the definition engine.
   *
   * @return {*}
   */
  options() {
  }

  /**
   * Composes the model class that is going to be used by the framework.
   */
  compose() {
    this._model = this._storage.definition(this.entity, this.definition(), this.options());
    this.enhance();
    this.isComposed = true;
  }

  /**
   * Returns the model class composed by the storage engine.
   *
   * @type {Object}
   */
  get model() {
    return this._model;
  }
}

module.exports = Model;
