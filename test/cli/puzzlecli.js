"use strict";

module.exports = {
  env: "test",
  i18n: {
    __: (...msg) => `TRANSLATED: ${msg.join(' ')}`
  },
  cli: {
    messages: [],
    shouldExit: false,
    exitCode: 0,
    _push(type, msg) {
      this.messages.push(`[${type.toLowerCase()}] ${msg}`)
    },
    debug(msg) {
      return this._push("debug", msg)
    },
    info(msg) {
      return this._push("info", msg)
    },
    error(msg) {
      return this._push("error", msg)
    },
    fatal(msg) {
      return this._push("fatal", msg)
    },
    ok(msg) {
      return this._push("ok", msg)
    }
  }
};
