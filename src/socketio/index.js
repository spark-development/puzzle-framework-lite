"use strict";

/** global: puzzle */

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

  /**
   * Attaches the socket.io functionality to the engine.
   *
   * @param {PEngine} engine The engine reference.
   */
  use(engine) {
    const { config } = engine;
    this._enabled = config.socket && config.socket.enabled;

    /**
     * Socket.IO reference.
     *
     * @type {socket.io}
     * @alias puzzle.io
     */
    engine.set("io", this._enabled ? socketio(engine.server) : () => {
      throw new Error("Sockets aren't enabled");
    });

    if (this._enabled) {
      engine.set("socketio", this);
      puzzle.modules.register("socketio", this);
    }
  }

  /**
   * When the server is up and running, attach the socket.io functionality. It works only when
   * socket.io functionality is enabled.
   */
  online() {
    super.online();
    const { io } = puzzle;

    if (!this._enabled) {
      return;
    }

    io.sockets.on("connection", (socket) => {
      puzzle.log.debug("New Connection");
      socket.modules = {};

      _.each(this._modules, (Instance, name) => {
        if (!this.isValid(Instance)) {
          return;
        }

        puzzle.log.debug(`Registered [${name}] element for connection`);
        socket.modules[name] = new Instance(socket, io.sockets);
      });

      socket.on("disconnect", () => {
        delete socket.modules;
        puzzle.log.debug("Disconnected");
      });
    });
  }
}

module.exports = SocketIO;
