"use strict";

// const _ = require("lodash");
const socketio = require("socket.io");

const PRuntime = require("../core/PRuntime");

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
 * @extends core.PRuntime
 * @memberOf socketio
 */
class SocketIO extends PRuntime {
  use(engine) {
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
     * @type {socket.io}
     * @alias engine.io
     */
    engine.set("io", this._enabled ? socketio(engine.server) : () => {
      throw new Error("Sockets aren't enabled");
    });
  }

  online() {
    super.online();
    const { io } = puzzle;

    if (!this._enabled) {
      return;
    }

    io.sockets.on("connection", (socket) => {
      puzzle.log.debug("New Connection");

      // TODO: Rethink this part!
      // _.each(engine.modules(), (v, k) => {
      //   if (!this.isValid(v) || !this.isValid(v.sockets)) {
      //     return;
      //   }
      //
      //   engine.log.debug("Registered element for connection");
      //   v.sockets(engine, socket, io.sockets);
      // });

      socket.on("disconnect", () => {
        puzzle.log.debug("Disconnected");
      });
    });
  }
}

module.exports = SocketIO;

