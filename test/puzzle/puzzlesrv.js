"use strict";

const puzzleSRV = {
  app: {
    name: "SRV Test App",
    version: "0.0.0",
    modules: [],
  },
  i18n: {
    __: (...args) => args.join(","),
  },
  log: {
    messages: [],
    _push(type, msg) {
      this.messages.push(`[${type.toLowerCase()}] ${msg}`);
    },
    debug(msg) {
      return this._push("debug", msg);
    },
    info(msg) {
      return this._push("info", msg);
    },
    error(msg) {
      return this._push("error", msg);
    },
  },
};

module.exports = puzzleSRV;
