"use strict";

const _ = require("lodash");
const socketio = require("socket.io");

const ToggleRuntime = require("../../base/ToggleRuntime");

/**
 * Socketio namespace definition.
 *
 * @namespace socketio
 */

/**
 * SocketIO Module class.
 *
 * If the configuration enables it, the framework exposes websocket functionalities.
 *
 * @extends base.Runtime
 * @memberOf socketio
 */
class SocketIO extends ToggleRuntime {
  init() {
    const { engine } = this;
    const { config } = engine;
    /**
     * Checks to see if the SocketIO library is enabled or not.
     *
     * @protected
     * @member {boolean}
     */
    this._enabled = config.socket && config.socket.enabled;

    /**
     * Socket.IO reference.
     *
     * @memberOf engine
     * @type {socket.io}
     */
    engine.io = this._enabled ?
      socketio(engine.server) :
      () => {
        throw new Error("Sockets aren't enabled");
      };
  }

  run() {
    const { engine } = this;
    const { io } = engine;

    if (!this._enabled) {
      return;
    }

    io.sockets.on("connection", (socket) => {
      engine.log.debug("New Connection");

      _.each(engine.modules(), (v, k) => {
        if (!this.isValid(v) || !this.isValid(v.sockets)) {
          return;
        }

        engine.log.debug("Registered element for connection");
        v.sockets(engine, socket, io.sockets);
      });

      socket.on("disconnect", () => {
        engine.log.debug("Disconnected");
      });
    });
  }
}

module.exports = SocketIO;

