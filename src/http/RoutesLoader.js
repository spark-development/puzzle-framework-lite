"use strict";

const _ = require("lodash");
const fs = require("fs");
const path = require("path");

const PUse = require("../core/PUse");

/**
 * Routes loader class.
 *
 * Loads routes defined by a module into the application.
 *
 * @alias puzzle.routes
 * @extends core.PUse
 * @memberOf http
 */
class RoutesLoader extends PUse {
  /**
   * Initializes the Routes loader runtime.
   *
   * @param {PEngine} engine The engine reference.
   */
  use(engine) {
    engine.set("routes", this);
  }

  /**
   * Register a routes folder into the engine.
   *
   * @param {string} root The root folder of the module.
   * @param {string} [routes=routes] The name of the routes folder.
   */
  register(root, routes = "routes") {
    const fullPath = path.join(root, routes);
    fs.readdirSync(fullPath).forEach((file) => {
      if (path.extname(file) === ".js") {
        try {
          require(path.resolve(fullPath, file))();
        } catch (err) {
          /* Since we might register folders that have API class defined in them
             and since they are ES6+ Classes, we cannot call them directly. */
        }
      }
    });
  }

  /**
   * Register an API routes folder into the engine.
   *
   * @param {string} root The root folder of the module.
   * @param {string} [routes=routes] The name of the routes folder.
   */
  build(root, routes = "routes") {
    const fullPath = path.join(root, routes);
    fs.readdirSync(fullPath).forEach((file) => {
      if (path.extname(file) !== ".js") {
        return;
      }

      const ClassPath = require(path.resolve(fullPath, file));
      if (!this.isValid(ClassPath) || !_.isFunction(ClassPath)) {
        return;
      }

      try {
        const classRoute = new ClassPath();
        if (!classRoute.noImport) {
          classRoute.build();
        }
      } catch (e) {
        /* Since we might register folders that have routes defined as functions
           and not classes, we cannot call them with new. */
      }
    });
  }
}

module.exports = RoutesLoader;
