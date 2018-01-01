"use strict";

const _ = require("lodash");
const Promise = require("bluebird");

const InvalidModelDefinition = require("../exceptions/InvalidModelDefinition");
const ModelExists = require("../exceptions/ModelExists");
const ModelNotFound = require("../exceptions/ModelNotFound");
const PBase = require("../base/PBase");

// TODO: Extend the InMemoryTable with needed methods/function.

/**
 * Holds the entity/table into the memory.
 *
 * @memberOf models
 * @extends base.PBase
 */
class InMemoryTable extends PBase {
  /**
   * Constructor for the in memory table.
   *
   * @param {string} tableName The name of the table.
   * @param {Object} schema The schema of the table.
   */
  constructor(tableName, schema) {
    super();

    /**
     * Stores the data of the current table.
     *
     * @member {Array<string|number,Object>}
     * @protected
     */
    this._data = {};
    /**
     * The primary key of the current table.
     *
     * @member {string|number|null}
     * @protected
     */
    this._pk = null;
    /**
     * The internal numeric auto incremented id.
     *
     * @member {number}
     * @protected
     */
    this._autoId = 0;
    /**
     * Check to see if the system is going to use the auto increment feature.
     *
     * @member {boolean}
     * @protected
     */
    this._autoIncrement = false;
    /**
     * The schema of the current table.
     *
     * @member {Object}
     * @protected
     */
    this._schema = {};

    /**
     * The name of the table that we are going to use throughout the application.
     *
     * @member {string}
     */
    this.tableName = tableName;
    this.schema = schema;
  }

  /**
   * Returns the next id to be used by the autoincrement functionality.
   *
   * @type {number}
   */
  get nextId() {
    this._autoId += 1;
    return this._autoId;
  }

  /**
   * Returns the schema of the current table.
   *
   * @type {Object}
   */
  get schema() {
    return this._schema;
  }

  /**
   * Sets and parses the schema of the current table.
   *
   * @param {Object} schema The schema of the table.
   */
  set schema(schema) {
    this._schema = schema;

    _.each(this._schema, (v, k) => {
      if (this.isValid(v.primaryKey) && v.primaryKey === true) {
        this._pk = k;

        if (this.isValid(v.autoIncrement) && v.autoIncrement === true) {
          this._autoIncrement = true;
        }
      }
    });

    if (!this.isValid(this._pk)) {
      throw new InvalidModelDefinition(this.tableName);
    }
  }

  /**
   * Returns a promise to get all the element from the application.
   *
   * @return {Promise|bluebird}
   */
  getAll() {
    return new Promise(resolve => resolve(Object.values(this._data)));
  }

  /**
   * Returns a promise to get the element with the given id from the application.
   *
   * @param {string|number} id The id of the element.
   *
   * @return {Promise|bluebird}
   */
  getOne(id) {
    return new Promise((resolve, reject) =>
      (this.isValid(this._data[id]) ?
        resolve(this._data[id]) :
        reject(ModelNotFound(id))));
  }

  /**
   * Returns a promise to create a new element in the application.
   *
   * @param {Object} element The data to be added into the system.
   *
   * @return {Promise|bluebird}
   */
  create(element) {
    return new Promise((resolve, reject) => {
      const model = _.cloneDeep(element);
      _.each(Object.keys(model), (v) => {
        if (!this.isValid(this._schema[v])) {
          delete model[v];
        }
      });

      if (this._autoIncrement) {
        const { nextId } = this;
        if (this.isValid(this._data[nextId])) {
          return reject(ModelExists(this.tableName));
        }
        model[this._pk] = nextId;
        this._data[nextId] = model;
      } else {
        if (this.isValid(this._data[model[this._pk]])) {
          return reject(ModelExists(this.tableName));
        }
        this._data[model[this._pk]] = model;
      }

      model.save = () => new Promise(resolveM => resolveM(model));
      model.delete = () => new Promise((resolveM) => {
        delete this._data[model[this._pk]];
        resolveM(true);
      });

      return resolve(model);
    });
  }
}

module.exports = InMemoryTable;
