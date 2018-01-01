"use strict";

const _ = require("lodash");
const express = require("express");

const AuthenticatedUser = require("../utils/AuthenticatedUser");
const PObject = require("../base/PObject");
const RouteAccessException = require("../exceptions/RouteAccessException");

const URLBuilder = require("./URLBuilder");

/**
 * Web Routes base class.
 *
 * @abstract
 * @extends base.PObject
 * @memberOf http
 */
class Route extends PObject {
  /**
   * Creates an instance of the route.
   *
   * @param {engine} engine The global reference to the engine.
   * @param {string} path The path to the route.
   */
  constructor(engine, path) {
    super(engine);

    /**
     * The URL router of the current route.
     *
     * @member {Router}
     */
    this.router = express.Router();

    /**
     * The path served by this route.
     *
     * @member {string}
     */
    this.path = path;

    /**
     * A list with middlewares that apply to some routes exposed by this class.
     *
     * @member {Object.<string,Object[]>}
     */
    this.middlewares = {
      auth: [],
      group: [],
      before: [],
      after: []
    };

    /**
     * Where to redirect unauthenticated users.
     *
     * @member {string}
     */
    this.unauthenticatedRedirectTo = "/";
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
   * Pushes a middleware to the auth middleware stack.
   *
   * @param {callback} middleware The middlware to be pushed to the stack.
   */
  pushAuth(middleware) {
    this.pushMiddleware("auth", middleware);
  }

  /**
   * Pushes a middleware to the push middleware stack.
   *
   * @param {callback} middleware The middlware to be pushed to the stack.
   */
  pushGroup(middleware) {
    this.pushMiddleware("push", middleware);
  }

  /**
   * Pushes a middleware to the  before middleware stack.
   *
   * @param {callback} middleware The middlware to be pushed to the stack.
   */
  pushBefore(middleware) {
    this.pushMiddleware("before", middleware);
  }

  /**
   * Pushes a middleware to the after middleware stack.
   *
   * @param {callback} middleware The middlware to be pushed to the stack.
   */
  pushAfter(middleware) {
    this.pushMiddleware("after", middleware);
  }

  /**
   * Pushes a middleware to the given middleware stack.
   *
   * @param {string} middlewareName The name of the middleware stack.
   * @param {callback} middleware The middleware to be pushed onto the stack.
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
   * @param {callback} callback The callback method.
   */
  routeRegister(type, path, callback) {
    this.routeRegisterMiddleware(type, path, null, callback);
  }

  /**
   * Registers a route with a given type, middleware list name and a callback method.
   *
   * @param {string} type The type of request (GET, POST, PUT, DELETE).
   * @param {string} path The path of the route.
   * @param {string} middleware The name of the middleware list.
   * @param {callback} callback The callback method.
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
   * @param {callback} callback The callback method.
   */
  get(path, callback) {
    this.routeRegister("get", path, callback);
  }

  /**
   * Registers a POST route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  post(path, callback) {
    this.routeRegister("post", path, callback);
  }

  /**
   * Registers a PUT route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  put(path, callback) {
    this.routeRegister("put", path, callback);
  }

  /**
   * Registers a PATCH route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  patch(path, callback) {
    this.routeRegister("patch", path, callback);
  }

  /**
   * Registers a DELETE route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  delete(path, callback) {
    this.routeRegister("delete", path, callback);
  }

  /**
   * Registers an authenticated GET route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  getAuth(path, callback) {
    this.routeRegisterMiddleware("get", path, "auth", callback);
  }

  /**
   * Registers an authenticated POST route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  postAuth(path, callback) {
    this.routeRegisterMiddleware("post", path, "auth", callback);
  }

  /**
   * Registers an authenticated PUT route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  putAuth(path, callback) {
    this.routeRegisterMiddleware("put", path, "auth", callback);
  }

  /**
   * Registers an authenticated PATCH route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  patchAuth(path, callback) {
    this.routeRegisterMiddleware("patch", path, "auth", callback);
  }

  /**
   * Registers an authenticated DELETE route.
   *
   * @param {string} path The path of the route.
   * @param {callback} callback The callback method.
   */
  deleteAuth(path, callback) {
    this.routeRegisterMiddleware("delete", path, "auth", callback);
  }

  /**
   * Registers a GET route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {callback} callback The callback method.
   */
  getMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("get", path, middleware, callback);
  }

  /**
   * Registers a POST route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {callback} callback The callback method.
   */
  postMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("post", path, middleware, callback);
  }

  /**
   * Registers a PUT route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {callback} callback The callback method.
   */
  putMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("put", path, middleware, callback);
  }

  /**
   * Registers a PATCH route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {callback} callback The callback method.
   */
  patchMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("patch", path, middleware, callback);
  }

  /**
   * Registers a DELETE route with a middleware.
   *
   * @param {string} path The path of the route.
   * @param {string} middleware The middleware list used for various things.
   * @param {callback} callback The callback method.
   */
  deleteMiddleware(path, middleware, callback) {
    this.routeRegisterMiddleware("delete", path, middleware, callback);
  }

  /**
   * Builds the route in the express engine.
   */
  build() {
    this.register();

    this.engine.app.use(
      URLBuilder(this.engine, this.path),
      this.middlewares.group || [],
      this.router
    );
  }

  /**
   * Redirects an unauthenticated user to the root page.
   *
   * @param {Object} user The user object.
   * @param {Object} res The response object.
   */
  redirectUnauthenticated(user, res) {
    if (!AuthenticatedUser(user)) {
      res.redirect(this.unauthenticatedRedirectTo);
    }
  }

  /**
   * Tests to see if the user is allowed to perform an action or not.
   *
   * @param {Object} user The user object.
   * @param {string} page The name of the page/method.
   * @param {string} permission The name of the permission.
   * @throws RouteAccessException
   */
  allowed(user, page, permission) {
    if (!AuthenticatedUser(user) || (!user.isAdmin() && !user.allowed(permission))) {
      throw new RouteAccessException(page);
    }
  }
}

module.exports = Route;
