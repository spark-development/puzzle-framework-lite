"use strict";

const _ = require("lodash");

const Runtime = require("../base/Runtime");

/**
 * Middleware runtime.
 *
 * Loads general available middlewares for the application.
 *
 * @extends base.Runtime
 * @memberOf middleware
 */
class Middleware extends Runtime {
  init() {
    /**
     * Holds the middlewares that are going to be loaded into the application.
     *
     * @member {Object[]}
     */
    this.middlewares = [];
    this.ranMiddlewares = [];

    /**
     * Runtime middleware push system.
     *
     * @memberOf engine
     * @alias engine.middlewares
     *
     * @param {Object} middleware The middleware to be available at runtime.
     */
    this.engine.middlewares = (middleware) => {
      if (this.isValid(this.engine.cli)) {
        return;
      }

      if (middleware === "run") {
        this.run();
        return;
      }
      this.middlewares.push(middleware);
    };
  }

  run() {
    if (this.isValid(this.engine.cli)) {
      return;
    }
    _.each(this.middlewares, (v) => {
      v(this.engine);
      this.ranMiddlewares.push(v);
    });
    this.middlewares = [];
  }
}

module.exports = Middleware;
