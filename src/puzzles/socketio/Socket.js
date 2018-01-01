"use strict";

const PObject = require("../../base/PObject");
const RouteAccessException = require("../../exceptions/RouteAccessException");
const AuthenticatedUser = require("../../utils/AuthenticatedUser");

/**
 * WebSocket base class.
 *
 * To have some websocket functionality added into the framework, your desired class must extend this
 * abstract class that offers some base functionality.
 *
 * @abstract
 * @extends base.PObject
 * @memberOf socketio
 */
class Socket extends PObject {
  /**
   * Constructor of the Websocket class.
   *
   * @param {Object} engine Reference to the engine core.
   * @param {Object} socket The socket object.
   * @param {Object} broadcast The broadcast object.
   */
  constructor(engine, socket, broadcast) {
    super(engine);

    this.socket = socket;
    this.broadcast = broadcast;
    this.path = "";

    this.init();
    this.build();
  }

  /**
   * Initialisation some data for the socket.
   *
   * @abstract
   */
  init() {

  }

  /**
   * Builds a list with routes for the socket.
   *
   * @abstract
   */
  build() {

  }

  /**
   * Register a socket route.
   *
   * @param {string} action The listener name/route name.
   * @param {callback} fn The callback method.
   */
  register(action, fn) {
    this.socket.on(this.listen(action), (data) => {
      if (!this.allowed(action, `${this.path}.${action}`)) {
        return null;
      }

      return fn.call(this, this.socket.request, data);
    });
  }

  /**
   * Register a socket for anyone using the application.
   *
   * @param {string} action The listener name.
   */
  registerAll(action) {
    this.socket.on(this.listen(action), data => this[action].call(this, data));
  }

  /**
   * Returns a string containing the listener string.
   *
   * @param {string} action The name of the action.
   * @return {string}
   */
  listen(action) {
    return `${this.path}:${action}`;
  }

  /**
   * Returns a string containing the string to emit.
   *
   * @param {string} action The name of the action.
   * @return {string}
   */
  emit(action) {
    return `${this.path}.return:${action}`;
  }

  /**
   * Check if the user is allowed to perform the desired action.
   *
   * @param {string} page The name of the action.
   * @param {string} permission The permission name.
   * @throws RouteAccessException
   */
  allowed(page, permission) {
    const { user } = this.socket.request;

    if (!AuthenticatedUser(user) || (!user.isAdmin && !user.allowed(permission))) {
      throw new RouteAccessException(page);
    }
  }
}

module.exports = Socket;
