"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const Runtime = require("../base/Runtime");

/**
 * Routes loader class.
 *
 * Loads routes defined by a module into the application.
 *
 * @extends base.Runtime
 * @memberOf http
 */
class RoutesLoader extends Runtime {
  /**
   * Initializes the Routes loader runtime.
   */
  init() {
    /**
     * Holds a reference to the RoutesLoader object.
     *
     * @memberOf engine
     * @type RoutesLoader
     */
    this.engine.routes = this;
  }

  /**
   * Register a routes folder into the engine.
   *
   * @param {string} root The root folder of the module.
   * @param {string} [routes=routes] The name of the routes folder.
   */
  register(root, routes = "routes") {
    const fullpath = path.join(root, routes);
    fs.readdirSync(fullpath).forEach((file) => {
      if (path.extname(file) === ".js") {
        require(_.join([fullpath, file], "/"))(this.engine);
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
    const fullpath = path.join(root, routes);
    fs.readdirSync(fullpath).forEach((file) => {
      if (path.extname(file) === ".js") {
        const ClassPath = require(_.join([fullpath, file], "/"));
        const classRoute = new ClassPath(this.engine);
        classRoute.build();
      }
    });
  }
}

module.exports = RoutesLoader;
