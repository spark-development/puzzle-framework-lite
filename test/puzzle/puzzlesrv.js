"use strict";

const format = require("string-format");

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
    debug(msg, ...parameters) {
      return this._push("debug", format(msg.replace(new RegExp("%s", "gi"), "{}"), ...parameters));
    },
    info(msg, ...parameters) {
      return this._push("info", format(msg.replace(new RegExp("%s", "gi"), "{}"), ...parameters));
    },
    error(msg, ...parameters) {
      return this._push("error", format(msg.replace(new RegExp("%s", "gi"), "{}"), ...parameters));
    },
  },
};

module.exports = puzzleSRV;
