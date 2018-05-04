"use strict";

const _ = require("lodash");
const socketio = require("socket.io");

const PRuntime = require("../core/PRuntime");

/**
 * Socketio namespace definition.
 *
 * @namespace socketio
 */

/**
 * Socket.IO Module class.
 *
 * If the configuration enables it, the framework exposes websocket functionalities.
 *
 * @extends core.PRuntime
 * @memberOf socketio
 */
class SocketIO extends PRuntime {
  /**
   * Constructor of the Socket.IO functionality.
   */
  constructor() {
    super();

    /**
     * Checks to see if the socketio library is enabled or not (disabled by default).
     *
     * @protected
     * @property {boolean}
     */
    this._enabled = false;
    /**
     * A list of modules that use socket.io functionality.
     *
     * @protected
     * @property {boolean}
     */
    this._modules = {};
  }

  use(engine) {
    const { config } = engine;
    this._enabled = config.socket && config.socket.enabled;

    /**
     * Socket.IO reference.
     *
     * @type {socket.io}
     * @alias engine.io
     */
    engine.set("io", this._enabled ? socketio(engine.server) : () => {
      throw new Error("Sockets aren't enabled");
    });

    engine.set("socketio", this);

    if (this._enabled) {
      puzzle.modules.register("socket.io", this);
    }
  }

  online() {
    super.online();
    const { io } = puzzle;

    if (!this._enabled) {
      return;
    }

    io.sockets.on("connection", (socket) => {
      puzzle.log.debug("New Connection");
      socket.modules = {};

      _.each(this._modules, (instance, name) => {
        if (!this.isValid(instance)) {
          return;
        }

        puzzle.log.debug(`Registered [${name}] element for connection`);
        socket.modules[name] = new instance(socket, io.sockets);
      });

      socket.on("disconnect", () => {
        delete socket.modules;
        puzzle.log.debug("Disconnected");
      });
    });
  }
}

module.exports = SocketIO;

