"use strict";

const Route = require("./Route");

/**
 * REST API base class.
 *
 * @extends http.Route
 * @memberOf http
 */
class API extends Route {
  /**
   * Creates an instance of an API route.
   *
   * @param {engine} engine The global reference to the engine.
   * @param {string} path The path to the API route.
   */
  constructor(engine, path) {
    super(engine, path);
    this.middlewares.api = [];

    /**
     * Stores the base of the API Path.
     *
     * @member {string}
     */
    this.APIPath = this.engine.config.http.APIPath || "/api/master";
  }

  /**
   * Attaches the route path to the api path.
   */
  build() {
    this.path = `${this.APIPath}/${this.path}`;

    super.build();
  }
}

module.exports = API;
