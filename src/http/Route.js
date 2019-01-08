"use strict";

/** global: puzzle */

const _ = require("lodash");
const express = require("express");

const PObject = require("../core/PObject");
const URLBuilder = require("./URLBuilder");

/**
 * Web Routes base class.
 *
 * @abstract
 * @extends core.PObject
 * @memberOf http
 */
class Route extends PObject {
  /**
   * Creates an instance of the route.
   *
   * @param {string} path The path to the route.
   */
  constructor(path) {
    super();
    /**
     * The URL router of the current route.
     *
     * @property {Router}
     */
    this.router = express.Router({
      mergeParams: true
    });

    /**
     * The path served by this route.
     *
     * @property {string}
     */
    this.path = path || "";

    /**
     * Should this class be imported?
     *
     * @property {boolean}
     */
    this.noImport = false;

    /**
     * A list with middlewares that apply to some routes exposed by this class.
     *
     * @property {Object.<string,Object[]>}
     */
    this.middlewares = {
      group: [],
      before: [],
      after: []
    };
  }

  /**
   * Register all the routes exposed by this route.
   */
  register() {
    this.get("/", (req, res) => {
      res.json({
        hello: res.__("world"),
        path: this.path
      });
    });
  }

  /**
   * Appends middlewares before/after a route is run.
   *
   * @param {string} when When the action happens: before or after the middleware/route ran.
   * @param {Object[]} middlewares A list with all the middlewares.
   *
   * @return {Object[]}
   */
  _build(when, middlewares) {
    const extraMiddlewares = _.clone(this.middlewares[when]) || [];
    return [...middlewares, ...extraMiddlewares];
  }


  /**
   * Pushes a middleware to the group middleware stack.
   *
   * @param {function} middleware The middleware to be pushed to the stack.
   */
  pushGroup(middleware) {
    this.pushMiddleware("group", middleware);
  }

  /**
   * Pushes a middleware to the before middleware stack.
   *
   * @param {function} middleware The middleware to be pushed to the stack.
   */
  pushBefore(middleware) {
    this.pushMiddleware("before", middleware);
  }

  /**
   * Pushes a middleware to the after middleware stack.
   *
   * @param {function} middleware The middleware to be pushed to the stack.
   */
  pushAfter(middleware) {
    this.pushMiddleware("after", middleware);
  }

  /**
   * Pushes a middleware to the given middleware stack.
   *
   * @param {string} middlewareName The name of the middleware stack.
   * @param {function} middleware The middleware to be pushed onto the stack.
   */
  pushMiddleware(middlewareName, middleware) {
    if (!this.isValid(this.middlewares[middlewareName])) {
      this.middlewares[middlewareName] = [];
    }

    this.middlewares[middlewareName].push(middleware);
  }

  /**
   * Registers a route with a given type and a callback method.
   *
   * @param {string} type The type of request (GET, POST, PUT, DELETE).
   * @param {string} path The path of the route.
   * @param {function} callback The callback method.
   */
  routeRegister(type, path, callback) {
    this.routeRegisterMiddleware(type, path, null, callback);
  }

  /**
   * Registers a route with a given type, middleware list name and a callback method.
   *
   * @param {string} type The type of request (GET, POST, PUT, DELETE).
   * @param {string} path The path of the route.
   * @param {string|null} middleware The name of the middleware list.
   * @param {function} callback The callback method.
   */
  routeRegisterMiddleware(type, path, middleware, callback) {
    if (!this.isValid(middleware) || middleware === "before" || middleware === "after") {
      middleware = "";
    }
    let middlewares = _.clone(this.middlewares[middleware]) || [];
    middlewares.unshift(path);
    middlewares = this._build("before", middlewares);
    middlewares.push((req, res) => callback.call(this, req, res));
    middlewares = this._build("after", middlewares);
    this.router[type](...middlewares);
  }

  /**
   * Registers a GET route.
   *
   * @param {string} path The path of the route.
   * @param {function} callback The callback method.
   */
  get(path, callback) {
    this.routeRegister("get", path, callback);
  }

  /**
   * Registers a POST route.
   *
   * @param {string} path The path of the route.
   * @param {function} callback The callback method.
   */
  post(path, callback) {
    this.routeRegister("post", path, callback);
  }

  /**
   * Registers a PUT route.
   *
   * @param {string} path The path of the route.
   * @param {function} callback The callback method.
   */
  put(path, callback) {
    this.routeRegister("put", path, callback);
  }

  /**
   * Registers a PATCH route.
   *
   * @param {string} path The path of the route.
   * @param {function} callback The callback method.
   */
  patch(path, callback) {
    this.routeRegister("patch", path, callback);
  }

  /**
   * Registers a DELETE route.
   *
   * @param {string} path The path of the route.
   * @param {function} callback The callback method.
   */
  delete(path, callback) {
    this.routeRegister("delete", path, callback);
  }

  /**
   * Registers a GET route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {function} callback The callback method.
   */
  getMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("get", path, middleware, callback);
  }

  /**
   * Registers a POST route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {function} callback The callback method.
   */
  postMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("post", path, middleware, callback);
  }

  /**
   * Registers a PUT route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {function} callback The callback method.
   */
  putMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("put", path, middleware, callback);
  }

  /**
   * Registers a PATCH route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {function} callback The callback method.
   */
  patchMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("patch", path, middleware, callback);
  }

  /**
   * Registers a DELETE route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {function} callback The callback method.
   */
  deleteMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("delete", path, middleware, callback);
  }

  /**
   * Builds the route in the express engine.
   */
  build() {
    this.register();

    puzzle.http.use(
      URLBuilder(this.path),
      this.middlewares.group || [],
      this.router
    );
  }
}

module.exports = Route;
